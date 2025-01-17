import { FastifyInstance } from "fastify"
import { prisma } from "@/infra/connection/prisma"
import { z } from "zod"
import { sendNotification } from "@/infra/utils/sendNotification"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export default async function CreateOrder(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/orders",
    {
      schema: {
        summary: "Create an order",
        tags: ["Order"],
        body: z.object({
          specialityId: z.string(),
          value: z.optional(z.number()),
          title: z.string(),
          description: z.optional(z.string()),
        }),
      },
      onRequest: [app.authenticate],
    },
    async (request, reply) => {
      const { specialityId, title, value, description } = request.body

      const order = await prisma.order.create({
        data: {
          value,
          title,
          // @ts-expect-error has id
          clientId: request.user.id,
          specialityId,
          description: description ? description : undefined,
        },
        include: {
          client: true,
          speciality: true,
        },
      })

      await prisma.user.update({
        where: {
          // @ts-expect-error has id
          id: request.user.id,
        },
        data: {
          orders_amount: {
            increment: 1,
          },
        },
      })
      if (!order) {
        return reply.status(400).send({ message: "Erro ao criar pedido." })
      }

      await sendNotification.orderCreated(order.client.id)

      return reply.status(201).send(order)
    },
  )
}
