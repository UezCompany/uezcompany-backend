import { FastifyInstance } from "fastify"
import { prisma } from "@/infra/connection/prisma"
import { z } from "zod"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export default async function AssignOrderToUzer(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/orders/:orderId/assign",
    {
      schema: {
        summary: "Assigns an order to a uzer by order Id",
        tags: ["Order"],
        params: z.object({
          orderId: z.string().uuid(),
        }),
        body: z.object({
          value: z.optional(z.number()),
          uzerId: z.string(),
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

      const { value, uzerId } = request.body

      const order = await prisma.order
        .update({
          where: {
            id: orderId,
          },
          data: {
            status: "EM ANDAMENTO",
            available: false,
            value,
            uzer: {
              connect: {
                id: uzerId,
              },
            },
          },
        })
        .catch((err) => {
          console.log(err)
        })
      if (!order) {
        return reply.status(400).send({ message: "Erro ao atribuir o pedido." })
      }

      return reply.status(200).send(order)
    },
  )
}
