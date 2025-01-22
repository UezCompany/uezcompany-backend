import { orderRepository } from "@/repository/OrderRepository"
import { portfolioRepository } from "@/repository/portfolioRepository"
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
          orderId: z.string(),
        }),
      },
      onRequest: [app.authenticate],
    },
    async (request, reply) => {
      const { orderId } = request.body

      const existOrder = await orderRepository.getOrderById(orderId)

      if (!existOrder)
        return reply.status(400).send({
          Message:
            "Não é possivel fazer um portfolio de um serviço inexistente",
        })

      const portfolio = await portfolioRepository.createPortfolio(orderId)

      return reply.status(201).send(portfolio)
    },
  )
}
