import { FastifyInstance } from "fastify"
import { prisma } from "@/lib/prisma"

export default async function GetUserNotifications(app: FastifyInstance) {
  app.get("/notifications", async (request, reply) => {
    const { token } = request.cookies
    if (!token) {
      return reply.status(401).send({ message: "Token não informado" })
    }
    const decryptedToken: any = app.jwt.verify(token)
    if (!decryptedToken) {
      return reply.status(401).send({ message: "Token inválido ou expirado." })
    }

    const notifications = await prisma.notificacoes.findMany({
      where: {
        receiverId: decryptedToken.id,
      },
    })
    if (!notifications) {
      return reply
        .status(404)
        .send({ message: "O usuário não tem notificações" })
    }
    return reply.status(200).send({ notifications })
  })
}
