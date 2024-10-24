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
    },
    async (request, reply) => {
      const { token } = request.cookies

      if (!token) {
        return reply.status(401).send({ message: "Token não informado" })
      }

      const decryptedToken = app.jwt.verify(token)

      if (!decryptedToken) {
        return reply
          .status(401)
          .send({ message: "Token inválido ou expirado." })
      }

      const { orderId } = request.params

      const orders = orderRepository.getOrderById(orderId)
      return reply.status(200).send(orders)
    },
  )
}
