import { prisma } from "@/infra/connection/prisma"
import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"

export default async function CreatePortfolio(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/portfolios",
    {
      schema: {
        summary: "Create Portfolio by Order Id",
        tags: ["Uezer", "Portfolio"],
        body: z.object({
          order_id: z.string(),
        }),
      },
      onRequest: [app.authenticate],
    },
    async (request, reply) => {
      const { order_id } = request.body

      const existOrder = await prisma.order.findUnique({
        where: { id: order_id },
      })

      if (!existOrder)
        return reply.status(400).send({
          Message:
            "Não e possivel fazer um portfolio de um serviço inexistente",
        })

      const portfolio = await prisma.portfolio.create({
        data: {
          order: {
            connect: {
              id: order_id,
            },
          },
        },
      })

      return reply.status(201).send(portfolio)
    },
  )
}
