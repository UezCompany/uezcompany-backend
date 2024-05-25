import { FastifyInstance } from "fastify"
import { z } from "zod"
import { orderRepository } from "@/repository/OrderRepository"

export default async function GetPedidosById(app: FastifyInstance) {
  app.get("/pedidos/:id", async (request, reply) => {
    const { token } = request.cookies

    if (!token) {
      return reply.status(401).send({ message: "Token não informado" })
    }

    const decryptedToken = app.jwt.verify(token)

    if (!decryptedToken) {
      return reply.status(401).send({ message: "Token inválido ou expirado." })
    }

    const params = z.object({
      id: z.string(),
    })

    const { id } = params.parse(request.params)

    const pedidos = orderRepository.getOrdersById(id)
    return reply.status(200).send(pedidos)
  })
}