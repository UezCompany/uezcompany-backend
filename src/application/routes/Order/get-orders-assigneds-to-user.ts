import { FastifyInstance } from "fastify"
import { orderRepository } from "@/repository/OrderRepository"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"

export default async function GetOrdersAssignedsToUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/orders/:userId/assigned-orders",
    {
      schema: {
        summary: "Get all orders from a uzer",
        tags: ["Order"],
        params: z.object({
          userId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { token } = request.cookies

      if (!token) {
        return reply.status(401).send({ message: "Token não informado" })
      }

      const decryptedToken: any = app.jwt.verify(token)

      if (!decryptedToken) {
        return reply
          .status(401)
          .send({ message: "Token inválido ou expirado." })
      }

      const { userId } = request.params

      const orders = await orderRepository.getOrdersByUzer(userId)
      return reply.status(200).send(orders)
    },
  )
}
