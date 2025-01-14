import { FastifyInstance } from "fastify"
import { prisma } from "@/infra/connection/prisma"
import { z } from "zod"

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

      const notification = await prisma.notification.update({
        where: {
          id,
        },
        data: {
          readed: true,
        },
      })

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
