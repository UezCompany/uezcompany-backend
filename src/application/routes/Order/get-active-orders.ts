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

      const orders = await orderRepository.getActiveOrders()
      return reply.status(200).send(orders)
    },
  )
}
