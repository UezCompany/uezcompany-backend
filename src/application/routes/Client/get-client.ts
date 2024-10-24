import { FastifyInstance } from "fastify"
import { z } from "zod"
import { clientRepository } from "@/repository/ClientRepository"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export default async function GetClientBySlug(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/clients/:slug",
    {
      schema: {
        summary: "Get an Client by Slug (Id or Username)",
        tags: ["Client"],
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

      const params = z.object({
        slug: z.string(),
      })
      const { slug } = params.parse(request.params)

      const uuidSchema = z.string().uuid()
      const { success } = uuidSchema.safeParse(slug)

      if (!success) {
        const client = await clientRepository.getClientByUsername(slug)
        if (!client) {
          return reply.status(404).send({ message: "Usuário não encontrado" })
        }
        return reply.status(200).send(client)
      } else {
        const client = await clientRepository.getClientById(slug)
        if (!client) {
          return reply.status(404).send({ message: "Usuário não encontrado" })
        }
        return reply.status(200).send(client)
      }
    },
  )
}
