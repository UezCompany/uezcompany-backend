import { FastifyInstance } from "fastify"
import { prisma } from "@/infra/connection/prisma"
import { z } from "zod"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export default async function GetPortfolios(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/portfolios/:slug",
    {
      schema: {
        summary: "Get portfolio by uezer slug.",
        tags: ["Uezer", "Portfolio"],
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
        const existUser = await prisma.user.findUnique({
          where: { username: slug },
        })

        if (!existUser)
          return reply.send({
            Message: "Não existe nenhum usuario com o username informado",
          })

        const portfolio = await prisma.portfolio.findMany({
          where: {
            order: {
              uezer: {
                username: slug,
              },
            },
          },
        })
        return reply.status(200).send(portfolio)
      } else {
        const existUser = await prisma.user.findUnique({ where: { id: slug } })

        if (!existUser)
          return reply.send({
            Message: "Não existe nenhum usuario com o ID informado",
          })

        const portfolio = await prisma.portfolio.findMany({
          where: {
            order: {
              uezer: {
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
