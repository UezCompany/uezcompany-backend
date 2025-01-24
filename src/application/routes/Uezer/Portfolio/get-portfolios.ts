import { FastifyInstance } from "fastify"
import { z } from "zod"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { uezerRepository } from "@/repository/UezerRepository"
import { portfolioRepository } from "@/repository/portfolioRepository"

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

      const isUUID = z.string().uuid().safeParse(slug).success

      try {
        let user, portfolios

        if (isUUID) {
          user = await uezerRepository.getUezerById(slug)
          if (!user) {
            return reply.status(404).send({
              message: "Nenhum usuário encontrado com o ID informado.",
            })
          }

          portfolios =
            await portfolioRepository.getAllPortfolioBySlugOnOrder(slug)
        } else {
          user = await uezerRepository.getUezerByUsername(slug)
          if (!user) {
            return reply.status(404).send({
              message: "Nenhum usuário encontrado com o username informado.",
            })
          }

          portfolios = await portfolioRepository.getAllPortfolioBySlug(slug)
        }

        return reply.status(200).send(portfolios)
      } catch (error) {
        console.error("Erro ao buscar o portfólio:", error)
        return reply.status(500).send({
          message: "Erro interno no servidor ao buscar o portfólio.",
        })
      }
    },
  )
}
