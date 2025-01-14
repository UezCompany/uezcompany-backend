import { FastifyInstance } from "fastify"
import { orderRepository } from "@/repository/OrderRepository"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export default async function GetOrders(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/orders",
    {
      schema: {
        summary: "Get all orders",
        tags: ["Order"],
      },
      onRequest: [app.authenticate],
    },
    async (request, reply) => {
      const orders = await orderRepository.getOrders()
      return reply.status(200).send(orders)
    },
  )
}
