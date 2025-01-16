import { FastifyInstance } from "fastify"
import { z } from "zod"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { orderRepository } from "@/repository/OrderRepository"

export default async function GetOrderById(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/orders/:orderId",
    {
      schema: {
        summary: "Get order by order Id",
        tags: ["Order"],
        params: z.object({
          orderId: z.string().uuid(),
        }),
      },
      onRequest: [app.authenticate],
    },
    async (request, reply) => {
      const { orderId } = request.params

      const order = await orderRepository.getOrderById(orderId)
      return reply.status(200).send(order)
    },
  )
}
