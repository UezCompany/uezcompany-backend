import { FastifyInstance } from "fastify"
import { prisma } from "@/infra/connection/prisma"
import { z } from "zod"
import sendNotification from "@/infra/utils/sendNotification"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export default async function CreateOrder(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/orders",
    {
      schema: {
        summary: "Create an order",
        tags: ["Order"],
        body: z.object({
          category: z.string(),
          serviceId: z.string(),
          value: z.optional(z.number()),
          title: z.string(),
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

      const { serviceId, title, value } = request.body

      const order = await prisma.order.create({
        data: {
          value,
          title,
          client: {
            connect: {
              id: decryptedToken.id,
            },
          },
          service: {
            connect: {
              id: serviceId,
            },
          },
        },
      })
      if (!order) {
        return reply.status(400).send({ message: "Erro ao criar pedido." })
      }

      await sendNotification(
        decryptedToken.id,
        "Em breve um uzer mandará mensagem.",
        "pedLance",
      )

      return reply.status(201).send(order)
    },
  )
}
