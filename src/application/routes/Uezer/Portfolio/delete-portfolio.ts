import { prisma } from "@/infra/connection/prisma";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";


export default async function DeletePortfolio(app: FastifyInstance) {
     app
          .withTypeProvider<ZodTypeProvider>()
          .post('/portfolios/:id', {
               schema: {
                    params: z.object({
                         id: z.string().uuid()
                    })
               }
          }, async (request, reply) => {
               const { id } = request.params

               const existPortfolio = await prisma.portfolio.findMany({ where: { id } })

               if (!existPortfolio) return reply.status(400).send({ Message: "Não existe nenhum portfolio com esse ID" })

               await prisma.portfolio.delete({ where: { id } })

               return reply.status(200).send({ Message: "O portfolio foi deletado com sucesso" })
          })
}