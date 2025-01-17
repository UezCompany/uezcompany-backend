import { FastifyInstance } from "fastify"
import { z } from "zod"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { orderRepository } from "@/repository/OrderRepository"

export default async function CancelOrder(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/orders/:orderId/cancel",
    {
      schema: {
        summary: "Cancel an order",
        tags: ["Order"],
        params: z.object({
          orderId: z.string(),
        }),
      },
      onRequest: [app.authenticate],
    },
    async (request, reply) => {
      const { orderId } = request.params

      //@ts-expect-error has id
      const userId = request.user.id

      const respectiveOrder = await orderRepository.getOrderById(orderId)

      if (!respectiveOrder) {
        return reply
          .status(404)
          .send({ message: "O pedido não foi encontrado" })
      }

      if (respectiveOrder?.clientId !== userId) {
        return reply
          .status(401)
          .send({ message: "Somente quem criou o pedido pode cancela-lo" })
      }

      if (respectiveOrder?.status === "CANCELLED") {
        return reply
          .status(400)
          .send({ message: "O pedido já está cancelado." })
      }

      const order = await orderRepository.cancelOrder(orderId)

      if (!order) {
        return reply.status(400).send({ message: "Erro ao cancelar o pedido" })
      }

      return reply.status(200).send(order)
    },
  )
}
