import { FastifyInstance } from "fastify"
import { prisma } from "@/infra/connection/prisma"
import { z } from "zod"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export default async function AssignOrderToUezer(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/orders/:orderId/assign",
    {
      schema: {
        summary: "Assigns an order to a uezer by order Id",
        tags: ["Order"],
        params: z.object({
          orderId: z.string().uuid(),
        }),
        body: z.object({
          value: z.optional(z.number()),
          uezerId: z.string(),
        }),
      },
      onRequest: [app.authenticate],
    },
    async (request, reply) => {
      const { orderId } = request.params

      const { value, uezerId } = request.body

      const order = await prisma.order
        .update({
          where: {
            id: orderId,
          },
          data: {
            status: "IN_PROGRESS",
            available: false,
            value,
            uezer: {
              connect: {
                id: uezerId,
              },
            },
          },
        })
        .catch((err) => {
          console.log(err)
        })
      if (!order) {
        return reply.status(400).send({ message: "Erro ao atribuir o pedido." })
      }

      return reply.status(200).send(order)
    },
  )
}
