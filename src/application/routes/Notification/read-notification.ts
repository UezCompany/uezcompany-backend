import { FastifyInstance } from "fastify"
import { z } from "zod"
import { notificationRepository } from "@/repository/notificationRepository"

export default async function ReadNotificacao(app: FastifyInstance) {
  app.post(
    "/notifications/read/:id",
    {
      schema: {
        summary: "View the notification by id",
        tags: ["Notification"],
        params: z.object({
          id: z.string().uuid(),
        }),
      },
      onRequest: [app.authenticate],
    },
    async (request, reply) => {
      const params = z.object({
        id: z.string(),
      })

      const { id } = params.parse(request.params)

      const notification = await notificationRepository.readNotification(id)

      if (!notification) {
        return reply.status(404).send({
          message: "Notificação não encontrada",
        })
      }

      return reply.status(200).send({
        message: "Notificação lida",
        notification,
      })
    },
  )
}
