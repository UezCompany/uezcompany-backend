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
        }),
      },
      onRequest: [app.authenticate],
    },
    async (request, reply) => {
      const { specialityId, title, value } = request.body

      const order = await prisma.order.create({
        data: {
          value,
          title,
          client: {
            connect: {
              // @ts-expect-error has id
              id: request.user.id,
            },
          },
          speciality: {
            connect: {
              id: specialityId,
            },
          },
        },
        include: {
          client: true,
          speciality: true,
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
