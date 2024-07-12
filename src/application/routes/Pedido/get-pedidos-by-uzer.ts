import { FastifyInstance } from "fastify"
import { orderRepository } from "@/repository/OrderRepository"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export default async function GetPedidosByUzer(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get("/pedidos/uzer", {
      schema: {
        summary: "Get all orders from a uzer",
        tags: ["Pedido"],
      }
    }, async (request, reply) => {
      const { token } = request.cookies

      if (!token) {
        return reply.status(401).send({ message: "Token não informado" })
      }

      const decryptedToken: any = app.jwt.verify(token)

      if (!decryptedToken) {
        return reply.status(401).send({ message: "Token inválido ou expirado." })
      }

      const pedidos = await orderRepository.getOrdersByUzer(decryptedToken.idUzer)
      return reply.status(200).send(pedidos)
    })
}
