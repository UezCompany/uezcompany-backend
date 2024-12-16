import { FastifyInstance } from "fastify"
import { z } from "zod"
import { uzerRepository } from "@/repository/UzerRepository"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export default async function GetUzerBySlug(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/uzers/:slug",
    {
      schema: {
        summary: "Get an Uzer by Slug (Id or Username)",
        tags: ["Uzer"],
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
        const uzer = await uzerRepository.getUzerByUsername(slug)
        if (!uzer) {
          return reply.status(404).send({ message: "Usuário não encontrado" })
        }
        return reply.status(200).send(uzer)
      } else {
        const uzer = uzerRepository.getUzerById(slug)
        if (!uzer) {
          return reply.status(404).send({ message: "Usuário não encontrado" })
        }
        return reply.status(200).send(uzer)
      }
    },
  )
}
