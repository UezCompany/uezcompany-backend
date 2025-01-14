import { FastifyInstance } from "fastify"
import { orderRepository } from "@/repository/OrderRepository"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export default async function GetActiveOrders(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/orders/active",
    {
      schema: {
        summary: "Get all active orders",
        tags: ["Order"],
      },
      onRequest: [app.authenticate],
    },
    async (request, reply) => {
      const orders = await orderRepository.getActiveOrders()
      return reply.status(200).send(orders)
    },
  )
}
