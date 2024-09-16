import { FastifyInstance } from "fastify"
import { z } from "zod"
import { uzerRepository } from "@/repository/UzerRepository"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { uzerSchema } from "@/infra/lib/ZodSchemas/Response/UzerSchema"

export default async function GetUzers(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/uzers",
    {
      schema: {
        summary: "Get all Uzers",
        tags: ["Uzer"],
        querystring: z
          .object({
            page: z.optional(z.string()),
            pageSize: z.optional(z.string()),
          })
          .transform((data) => ({
            page: data.page ? parseInt(data.page, 10) : 1,
            pageSize: data.pageSize ? parseInt(data.pageSize, 10) : 50,
          })),
        response: {
          200: z.array(uzerSchema),
          401: z.object({
            message: z.string(),
          }),
        },
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

      const { page, pageSize } = request.query

      const offset = (page <= 1 ? 0 : page - 1) * pageSize

      const uzers = await uzerRepository.getUzers(offset, pageSize)
      return reply.status(200).send(uzers)
    },
  )
}
