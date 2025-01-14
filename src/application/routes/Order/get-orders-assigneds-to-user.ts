import { FastifyInstance } from "fastify"
import { orderRepository } from "@/repository/OrderRepository"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"

export default async function GetOrdersAssignedsToUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/orders/:userId/assigned-orders",
    {
      schema: {
        summary: "Get all orders from a uezer",
        tags: ["Order"],
        params: z.object({
          userId: z.string(),
        }),
      },
      onRequest: [app.authenticate],
    },
    async (request, reply) => {
      const { userId } = request.params

      const orders = await orderRepository.getOrdersByUezer(userId)
      return reply.status(200).send(orders)
    },
  )
}
