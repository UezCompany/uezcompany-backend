import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { uploadImage } from "@/infra/aws"
import { prisma } from "@/infra/connection/prisma"

const allowedMimes = ["image/jpeg", "image/png", "image/gif"]

export default async function UpdateUserImages(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().patch(
    "/users/image",
    {
      // schema: {
      //   consumes: ["multipart/form-data"],
      //   summary: "Update User Profile Image",
      //   tags: ["User"],
      //   body: {
      //     type: "object",
      //     properties: {
      //       file: {
      //         type: "string",
      //         format: "binary",
      //         description: "Image file to upload",
      //       },
      //     },
      //     required: ["file"],
      //   },
      //   response: {
      //     200: {
      //       description: "Imagem atualizada com sucesso!",
      //       type: "object",
      //       properties: {
      //         message: { type: "string" },
      //       },
      //     },
      //     400: {
      //       description: "Erro ao enviar o arquivo",
      //       type: "object",
      //       properties: {
      //         message: { type: "string" },
      //       },
      //     },
      //   },
      // },
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
      // schema: {
      //   consumes: ["multipart/form-data"],
      //   summary: "Update User Profile Banner",
      //   tags: ["User"],
      //   body: {
      //     type: "object",
      //     properties: {
      //       file: {
      //         type: "string",
      //         format: "binary",
      //         description: "Image file to upload",
      //       },
      //     },
      //     required: ["file"],
      //   },
      //   response: {
      //     200: {
      //       description: "Banner atualizado com sucesso!",
      //       type: "object",
      //       properties: {
      //         message: { type: "string" },
      //       },
      //     },
      //     400: {
      //       description: "Erro ao enviar o arquivo",
      //       type: "object",
      //       properties: {
      //         message: { type: "string" },
      //       },
      //     },
      //   },
      // },
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
