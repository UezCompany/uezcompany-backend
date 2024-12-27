import { FastifyInstance } from "fastify"
import { z } from "zod"
import { uezerRepository } from "@/repository/UezerRepository"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export default async function GetUezerBySlug(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/uezers/:slug",
    {
      schema: {
        summary: "Get an Uezer by Slug (Id or Username)",
        tags: ["Uezer"],
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
        const uezer = await uezerRepository.getUezerByUsername(slug)
        if (!uezer) {
          return reply.status(404).send({ message: "Usuário não encontrado" })
        }
        return reply.status(200).send(uezer)
      } else {
        const uezer = uezerRepository.getUezerById(slug)
        if (!uezer) {
          return reply.status(404).send({ message: "Usuário não encontrado" })
        }
        return reply.status(200).send(uezer)
      }
    },
  )
}
