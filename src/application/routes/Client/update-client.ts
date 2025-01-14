import { FastifyInstance } from "fastify"
import { z } from "zod"
import { clientRepository } from "@/repository/ClientRepository"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export default async function UpdateClientBySlug(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().patch(
    "/clients/:slug",
    {
      schema: {
        summary: "Update an Client by Slug (Id or Username)",
        tags: ["Client"],
        params: z.object({
          slug: z.string(),
        }),
        body: z.object({
          name: z
            .string()
            .min(1, "O nome não pode estar vazio")
            .transform((valor) =>
              valor.trim().replace(/\b\w/g, (letra) => letra.toUpperCase()),
            )
            .optional(),
          email: z.string().email().optional(),
          bio: z.string().optional(),
          birth_date: z.string().optional(),
          phone: z.string().optional(),
          username: z.string().toLowerCase().optional(),
          image: z.string().url().optional(),
        }),
      },
      onRequest: [app.authenticate],
    },
    async (request, reply) => {
      const params = z.object({ slug: z.string() })

      const { slug } = params.parse(request.params)

      const uuidSchema = z.string().uuid()
      const { success } = uuidSchema.safeParse(slug)

      const bodyData = request.body

      if (!bodyData)
        return reply
          .status(400)
          .send({ Message: "Não e possivel fazer uma atualização sem dados" })

      if (!success) {
        const client = await clientRepository.getClientByUsername(slug)

        if (!client) {
          return reply.status(404).send({ message: "Usuário não encontrado" })
        }

        await clientRepository.updateClientByUsername(slug, bodyData)

        return reply.status(200).send(client)
      } else {
        const client = await clientRepository.getClientById(slug)

        if (!client) {
          return reply.status(404).send({ message: "Usuário não encontrado" })
        }

        await clientRepository.updateClientById(slug, bodyData)

        return reply.status(200).send(client)
      }
    },
  )
}
