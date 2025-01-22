import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { notificationRepository } from "@/repository/notificationRepository"

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
      // @ts-expect-error has id
      const notifications = await notificationRepository.readAllNotificacoes(request.user.id)

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
