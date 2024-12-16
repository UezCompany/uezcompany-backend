import { FastifyInstance } from "fastify"
import { prisma } from "@/infra/connection/prisma"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export default async function GetChats(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/chats",
    {
      schema: {
        summary: "Get all chats",
        tags: ["Chat"],
      },
    },
    async (request, reply) => {
      const { token } = request.cookies
      if (!token) {
        return reply.status(401).send({ message: "Token não informado" })
      }
      const decryptedToken: { id: string } = app.jwt.verify(token)
      if (!decryptedToken) {
        return reply
          .status(401)
          .send({ message: "Token inválido ou expirado." })
      }

      const chats = await prisma.chat.findMany({
        where: {
          users: {
            some: {
              id: decryptedToken.id,
            },
          },
        },
        include: {
          messages: true,
          users: true,
        },
      })

      if (!chats) {
        return reply.status(400).send({ message: "Você não tem chats" })
      }

      return reply.status(200).send(chats)
    },
  )
}
