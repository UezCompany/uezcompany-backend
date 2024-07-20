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
    },
    async (request, reply) => {
      const { token } = request.cookies

      if (!token) {
        return reply.status(401).send({ message: "Token não informado" })
      }

      const decryptedToken = app.jwt.verify(token)

      if (!decryptedToken) {
        return reply
          .status(401)
          .send({ message: "Token inválido ou expirado." })
      }

      const { slug } = request.params

      const uuidSchema = z.string().uuid()
      const { success } = uuidSchema.safeParse(slug)

      if (!success) {
        const portfolio = await prisma.portfolio.findMany({
          where: {
            pedido: {
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
            pedido: {
              uzer: {
                id: slug,
              },
            },
          },
          include: {
            pedido: true,
          },
        })
        return reply.status(200).send(portfolio)
      }
    },
  )
}
