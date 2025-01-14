import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { uploadImage } from "@/infra/aws"
import { prisma } from "@/infra/connection/prisma"

export default async function UpdateUserImages(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/users/image",
    {
      schema: {
        summary: "Update User Profile Image",
        tags: ["User"],
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
      onRequest: [app.authenticate],
    },
    async (request, reply) => {
      // @ts-expect-error id is added to user object in the authenticate hook
      const userId = request.user.id
      const data = await request.file()
      if (!data || !data.mimetype.includes("image"))
        return reply.status(400).send({ Message: "File not found" })

      const fileBuffer = await data.toBuffer()
      const filename = `${userId}.${data.mimetype.split("/")[1]}`

      const url = await uploadImage.profileImage(fileBuffer, filename)

      await prisma.user.update({
        where: { id: userId },
        data: { image: url },
      })

      return reply
        .status(200)
        .send({ message: "Imagem atualizada com sucesso!" })
    },
  )
  app.withTypeProvider<ZodTypeProvider>().put(
    "/users/banner",
    {
      schema: {
        summary: "Update User Profile Banner",
        tags: ["User"],
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
      onRequest: [app.authenticate],
    },
    async (request, reply) => {
      // @ts-expect-error id is added to user object in the authenticate hook
      const userId = request.user.id
      const data = await request.file()
      if (!data || !data.mimetype.includes("image"))
        return reply.status(400).send({ Message: "File not found" })

      const fileBuffer = await data.toBuffer()
      const filename = `${userId}.${data.mimetype.split("/")[1]}`

      const url = await uploadImage.bannerImage(fileBuffer, filename)

      await prisma.user.update({
        where: { id: userId },
        data: { banner: url },
      })

      return reply
        .status(200)
        .send({ message: "Banner atualizado com sucesso!" })
    },
  )
}
