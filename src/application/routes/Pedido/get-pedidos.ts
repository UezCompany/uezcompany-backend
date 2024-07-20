import { FastifyInstance } from "fastify"
import { orderRepository } from "@/repository/OrderRepository"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export default async function GetPedidos(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/pedidos",
    {
      schema: {
        summary: "Get all orders",
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

      const pedidos = await orderRepository.getOrders()
      return reply.status(200).send(pedidos)
    },
  )
}
