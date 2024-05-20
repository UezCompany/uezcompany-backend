import { FastifyInstance } from "fastify"
import { orderRepository } from "@/repository/OrderRepository"

export default async function GetActivePedidos(app: FastifyInstance) {
  app.get("/pedidosAtivos", async (request, reply) => {
    const { token } = request.cookies

    if (!token) {
      return reply.status(401).send({ message: "Token não informado" })
    }

    const decryptedToken = app.jwt.verify(token)

    if (!decryptedToken) {
      return reply.status(401).send({ message: "Token inválido ou expirado." })
    }

    const pedidos = await orderRepository.getActiveOrders()
    return reply.status(200).send(pedidos)
  })
}
