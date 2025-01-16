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
      onRequest: [app.authenticate],
    },
    async (request, reply) => {
      // @ts-expect-error - decryptedToken is added by the authenticate hook
      const userId = request.user.id

      const { orderId } = request.params

      const order = await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: "WAITING_EVALUATION",
          available: false,
          uezer: {
            connect: {
              id: userId,
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
