import { FastifyInstance } from "fastify"
import { prisma } from "@/infra/connection/prisma"
import { z } from "zod"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export default async function FinishOrder(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/orders/:orderId/finish",
    {
      schema: {
        summary: "Complete the order using order Id",
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

      const decryptedToken: any = app.jwt.verify(token)

      if (!decryptedToken) {
        return reply
          .status(401)
          .send({ message: "Token inválido ou expirado." })
      }

      const { orderId } = request.params

      const order = await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: "A AVALIAR",
          available: false,
          uzer: {
            connect: {
              id: decryptedToken.id,
            },
          },
        },
      })
      if (!order) {
        return reply.status(400).send({ message: "Erro ao atribuir o pedido." })
      }
      return reply.status(200).send(order)
    },
  )
}
