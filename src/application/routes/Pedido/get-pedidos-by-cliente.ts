import { FastifyInstance } from "fastify"
import { z } from "zod"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { orderRepository } from "@/repository/OrderRepository"

export default async function GetPedidosByCliente(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get("/pedidos/cliente/:id", {
      schema: {
        summary: "Get orders by client Id",
        tags: ["Pedido"],
        params: z.object({
          id: z.string().uuid(),
        }),
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

      const params = z.object({
        id: z.string(),
      })

      const { id } = params.parse(request.params)

      const pedidos = await orderRepository.getOrdersByClient(id)
      return reply.status(200).send(pedidos)
    })
}
