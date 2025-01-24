import { prisma } from "@/infra/connection/prisma"
import { orderRepository } from "@/repository/OrderRepository"
import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"

export default async function CreatePortfolioAssignedToOrder(
  app: FastifyInstance,
) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/portfolios/:orderId",
    {
      schema: {
        summary: "Create Portfolio Assigned to OrderId",
        tags: ["Uezer", "Portfolio"],
        params: z.object({
          orderId: z.string(),
        }),
      },
      onRequest: [app.authenticate],
    },
    async (request, reply) => {
      const { orderId } = request.params

      const existOrder = await orderRepository.getOrderById(orderId)

      if (!existOrder || !existOrder.uezerId)
        return reply.status(404).send({
          Message: "O pedido não foi encontrado",
        })
      if (!existOrder.uezerId || existOrder.status !== "COMPLETED")
        return reply.status(404).send({
          Message: "O pedido precisa estar concluido para criar um portfolio",
        })

      const portfolio = await prisma.portfolio.create({
        data: {
          orderId,
          title: existOrder.title,
          ownerId: existOrder.uezerId,
          description: existOrder.description,
          professionId: existOrder.speciality.professionId,
          specialities: {
            connect: {
              id: existOrder.specialityId,
            },
          },
        },
      })

      return reply.status(201).send(portfolio)
    },
  )
}
