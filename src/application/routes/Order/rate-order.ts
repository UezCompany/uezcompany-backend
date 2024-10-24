import { FastifyInstance } from "fastify"
import { prisma } from "@/infra/connection/prisma"
import { z } from "zod"
import sendNotification from "@/infra/utils/sendNotification"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export default async function RateOrder(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/orders/:orderId/rate",
    {
      schema: {
        summary: "Evaluate the order through the Id",
        tags: ["Order"],
        params: z.object({
          orderId: z.string().uuid(),
        }),
        body: z.object({
          rating: z.coerce.number(),
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

      const { rating } = request.body

      const estaAvaliado = await prisma.order.findUnique({
        where: {
          id: orderId,
          rated: true,
        },
      })

      if (estaAvaliado) {
        return reply.status(400).send({ message: "O pedido ja foi avaliado." })
      }

      const order = await prisma.order.update({
        where: { id: orderId },
        data: {
          rated: true,
          rating: Number(rating),
          status: "CONCLUIDO",
        },
      })

      const uzer = await prisma.user.update({
        where: {
          id: order.uzerId || "",
        },
        data: {
          ratings: {
            push: rating,
          },
        },
      })

      const newAvaliacao =
        uzer.ratings.length === 0
          ? rating
          : (uzer.ratings.reduce((acc, curr) => Number(acc) + Number(curr), 0) +
              Number(rating)) /
              uzer.ratings.length +
            1
      const uzerAvaliado = await prisma.user.update({
        where: {
          id: uzer.id,
        },
        data: {
          rating: newAvaliacao,
        },
      })

      if (!uzerAvaliado || !order) {
        return reply.status(400).send({ message: "Erro ao avaliar o pedido." })
      }

      await sendNotification(
        uzer.id,
        `R$ ${order.value} do serviço ${order.title} já está na sua carteira`,
        "servAval",
      )

      return reply
        .status(200)
        .send({ message: "O pedido foi avaliado com sucesso.", order: order })
    },
  )
}
