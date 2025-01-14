import { FastifyInstance } from "fastify"
import { z } from "zod"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { orderRepository } from "@/repository/OrderRepository"

export default async function GetOrdersCreatedByUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/orders/:userId/created-orders",
    {
      schema: {
        summary: "Get orders by user Id",
        tags: ["Order"],
        params: z.object({
          userId: z.string().uuid(),
        }),
      },
      onRequest: [app.authenticate],
    },
    async (request, reply) => {
      const { userId } = request.params

      const orders = await orderRepository.getCreatedOrdersByUser(userId)
      return reply.status(200).send(orders)
    },
  )
}
