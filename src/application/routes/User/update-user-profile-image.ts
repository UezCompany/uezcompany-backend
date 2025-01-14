import { FastifyInstance } from "fastify"
import { z } from "zod"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { pipeline } from "node:stream/promises"
import fs from "node:fs"
import path from "node:path"
import { uploadImage } from "@/infra/aws"

export default async function UpdateUserProfileImage(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/users/:userId/image",
    {
      schema: {
        summary: "Update User Profile Image",
        tags: ["User"],
        params: z.object({
          userId: z.string().uuid(),
        }),
      },
      // onRequest: [app.authenticate],
    },
    async (request, reply) => {
      const { userId } = request.params
      const data = await request.file()
      if (!data) return reply.status(400).send({ Message: "File not found" })

      const uploadDir = path.join(process.cwd(), "uploads")
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir)
      }

      await pipeline(
        data.file,
        fs.createWriteStream(path.join(uploadDir, `${userId}.png`)),
      )

      // await uploadImage.profileImage(
      //   fs.readFileSync(path.join(uploadDir, `${userId}.png`)),
      //   `${userId}.png`,
      // )

      return reply.send()
    },
  )
}
