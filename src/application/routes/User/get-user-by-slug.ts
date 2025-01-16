import { FastifyInstance } from "fastify"
import { z } from "zod"
import { userRepository } from "@/repository/UserRepository"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export default async function GetUserBySlug(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/users/:slug",
    {
      schema: {
        summary: "Get an User by Slug (Id or Username)",
        tags: ["User"],
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
        const user = await userRepository.getUserByUsername(slug)
        if (!user) {
          return reply.status(404).send({ message: "Usuário não encontrado" })
        }
        return reply.status(200).send(user)
      } else {
        const user = userRepository.getUserById(slug)
        if (!user) {
          return reply.status(404).send({ message: "Usuário não encontrado" })
        }

        return reply.status(200).send(user)
      }
    },
  )
}
