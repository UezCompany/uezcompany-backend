import { FastifyInstance } from "fastify"
import { z } from "zod"
import { userRepository } from "@/repository/UserRepository"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export default async function GetUsers(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/users",
    {
      onRequest: [app.authenticate],
      schema: {
        summary: "Get all Users",
        tags: ["User"],
        querystring: z
          .object({
            page: z.optional(z.string()),
            pageSize: z.optional(z.string()),
          })
          .transform((data) => ({
            page: data.page ? parseInt(data.page, 10) : 1,
            pageSize: data.pageSize ? parseInt(data.pageSize, 10) : 50,
          })),
      },
    },
    async (request, reply) => {
      const { page, pageSize } = request.query

      const users = await userRepository.getUsers(page, pageSize)
      return reply.status(200).send(users)
    },
  )
}
