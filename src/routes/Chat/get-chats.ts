import { FastifyInstance } from "fastify"
import { prisma } from "@/lib/prisma"

export default async function GetChats(app: FastifyInstance) {
  app.get("/chats", async (request, reply) => {
    const { token } = request.cookies
    if (!token) {
      return reply.status(401).send({ message: "Token não informado" })
    }
    const decryptedToken: { id: string } = app.jwt.verify(token)
    if (!decryptedToken) {
      return reply.status(401).send({ message: "Token inválido ou expirado." })
    }

    const chats = await prisma.chats.findMany({
      where: {
        creatorId: {
          equals: decryptedToken.id,
        },
      },
    })

    if (!chats) {
      return reply.status(400).send({ message: "Você não tem chats" })
    }

    return reply.status(200).send({ chats })
  })
}
