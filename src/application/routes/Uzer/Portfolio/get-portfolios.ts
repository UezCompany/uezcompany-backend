import { FastifyInstance } from "fastify"
import { prisma } from "@/infra/connection/prisma"
import { z } from "zod"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export default async function GetPortfolios(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/portfolios/:slug",
    {
      schema: {
        summary: "Get portfolio by uzerId",
        tags: ["Uzer", "Portfolio"],
        params: z.object({
          slug: z.string(),
        }),
      },
      onRequest: [app.authenticate],
    },
    async (request, reply) => {
      const { slug } = request.params

      const uuidSchema = z.string().uuid()
      const { success } = uuidSchema.safeParse(slug)

      if (!success) {
        const portfolio = await prisma.portfolio.findMany({
          where: {
            order: {
              uzer: {
                username: slug,
              },
            },
          },
        })
        return reply.status(200).send(portfolio)
      } else {
        const portfolio = await prisma.portfolio.findMany({
          where: {
            order: {
              uzer: {
                id: slug,
              },
            },
          },
          include: {
            order: true,
          },
        })
        return reply.status(200).send(portfolio)
      }
    },
  )
}
