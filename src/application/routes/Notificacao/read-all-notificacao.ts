import { FastifyInstance } from "fastify"
import { prisma } from "@/infra/connection/prisma"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export default async function ReadAllNotificacoes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/notifications/readall",
    {
      schema: {
        summary: "View all existing notifications",
        tags: ["Notification"],
      },
    },
    async (request, reply) => {
      const { token } = request.cookies
      if (!token) {
        return reply.status(401).send({ message: "Token não informado" })
      }
      const decryptedToken: any = app.jwt.verify(token)
      if (!decryptedToken) {
        return reply
          .status(401)
          .send({ message: "Token inválido ou expirado." })
      }

      const notifications = await prisma.notificacoes.updateMany({
        where: {
          receiverId: decryptedToken.id,
        },
        data: {
          readed: true,
        },
      })

      if (!notifications) {
        return reply.status(404).send({
          message: "Notificação não encontrada",
        })
      }

      return reply.status(200).send({
        message: "Notificações lidas",
        notifications,
      })
    },
  )
}
