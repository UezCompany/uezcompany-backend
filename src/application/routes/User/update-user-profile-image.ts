import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { uploadImage } from "@/infra/aws"
import { prisma } from "@/infra/connection/prisma"

const allowedMimes = ["image/jpeg", "image/png", "image/gif"]

export default async function UpdateUserImages(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().patch(
    "/users/image",
    {
      onRequest: [app.authenticate],
    },
    async (request, reply) => {
      // @ts-expect-error id is added to user object in the authenticate hook
      const userId = request.user.id
      const data = await request.file()

      if (!data || !allowedMimes.includes(data.mimetype)) {
        return reply
          .status(400)
          .send({ message: "Formato de arquivo inválido" })
      }

      const chunks: Buffer[] = []
      for await (const chunk of data.file) {
        chunks.push(chunk)
      }
      const fileBuffer = Buffer.concat(chunks)
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
  app.withTypeProvider<ZodTypeProvider>().patch(
    "/users/banner",
    {
      onRequest: [app.authenticate],
    },
    async (request, reply) => {
      // @ts-expect-error id is added to user object in the authenticate hook
      const userId = request.user.id
      const data = await request.file()
      if (!data || !allowedMimes.includes(data.mimetype)) {
        return reply
          .status(400)
          .send({ message: "Formato de arquivo inválido" })
      }

      const fileBuffer = await data.toBuffer()
      const filename = `${userId}.png`

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
