import { FastifyInstance } from "fastify"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

export default async function GetPortfolios(app: FastifyInstance) {
  app.get("/portfolios/:slug", async (request, reply) => {
    const { token } = request.cookies

    if (!token) {
      return reply.status(401).send({ message: "Token não informado" })
    }

    const decryptedToken = app.jwt.verify(token)

    if (!decryptedToken) {
      return reply.status(401).send({ message: "Token inválido ou expirado." })
    }

    const params = z.object({
      slug: z.string(),
    })
    const { slug } = params.parse(request.params)

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
  })
}
