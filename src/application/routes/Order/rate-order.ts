import { FastifyInstance } from "fastify"
import { prisma } from "@/infra/connection/prisma"
import { z } from "zod"
import { sendNotification } from "@/infra/utils/sendNotification"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export default async function RateOrder(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/orders/:orderId/rate",
    {
      schema: {
        summary: "Evaluate the order through the Id",
        tags: ["Order"],
        params: z.object({
          orderId: z.string().uuid(),
        }),
        body: z.object({
          feedback: z.string(),
          satisfaction: z.number().min(0).max(5),
          speed: z.number().min(0).max(5),
          execution: z.number().min(0).max(5),
        }),
      },
      onRequest: [app.authenticate],
    },
    async (request, reply) => {
      const { orderId } = request.params

      // @ts-expect-error id is in the request
      const userId = request.user.id

      const { execution, feedback, satisfaction, speed } = request.body

      const order = await prisma.order.findUnique({
        where: {
          id: orderId,
        },
      })

      if (!order) {
        return reply.status(404).send({ message: "Pedido não encontrado." })
      }

      if (order.rated) {
        return reply.status(400).send({ message: "O pedido ja foi avaliado." })
      }

      if (!order.uezerId) {
        return reply
          .status(400)
          .send({ message: "O pedido não tem um uezer atrelado." })
      }

      if (order.clientId !== userId) {
        return reply
          .status(403)
          .send({ message: "Você não tem permissão para avaliar este pedido." })
      }

      const newRating = await prisma.rating.create({
        data: {
          execution,
          feedback,
          satisfaction,
          speed,
          average: (execution + satisfaction + speed) / 3,
          orderId,
          userId: userId,
          recipientId: order.uezerId,
        },
      })

      await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          rated: true,
          status: "COMPLETED",
          rating: {
            connect: {
              id: newRating.id,
            },
          },
        },
      })

      const newAverageRate = await prisma.rating
        .findMany({
          where: {
            recipientId: order.uezerId,
          },
        })
        .then((ratings) => {
          const total = ratings.reduce((acc, rating) => acc + rating.average, 0)
          return total / ratings.length
        })

      await prisma.user.update({
        where: {
          id: order.uezerId,
        },
        data: {
          rating: newAverageRate,
        },
      })

      await sendNotification.serviceRated(
        order.uezerId,
        order.value,
        order.title,
      )

      return reply
        .status(200)
        .send({ message: "O pedido foi avaliado com sucesso." })
    },
  )
}
