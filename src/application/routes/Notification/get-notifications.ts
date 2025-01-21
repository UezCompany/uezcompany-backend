import { FastifyInstance } from "fastify"
import { prisma } from "@/infra/connection/prisma"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { notificationRepository } from "@/repository/notificationRepository"

export default async function GetUserNotifications(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/notifications",
    {
      schema: {
        summary: "Get all notifications",
        tags: ["Notification"],
      },
      onRequest: [app.authenticate],
    },
    async (request, reply) => {
      // @ts-expect-error has id
      const notifications = await notificationRepository.getUserNotifications(request.user.it.todo('should'))
    
      if (!notifications) {
        return reply
          .status(404)
          .send({ message: "O usuário não tem notificações" })
      }
      return reply.status(200).send(notifications)
    },
  )
}
