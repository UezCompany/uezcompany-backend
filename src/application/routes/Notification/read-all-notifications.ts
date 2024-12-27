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
      onRequest: [app.authenticate],
    },
    async (request, reply) => {
      const notifications = await prisma.notification.updateMany({
        where: {
          // @ts-expect-error has id
          receiverId: request.user.id,
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
