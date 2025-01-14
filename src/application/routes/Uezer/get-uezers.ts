import { FastifyInstance } from "fastify"
import { z } from "zod"
import { uezerRepository } from "@/repository/UezerRepository"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export default async function GetUezers(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/uezers",
    {
      onRequest: [app.authenticate],
      schema: {
        summary: "Get all Uezers",
        tags: ["Uezer"],
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

      const uezers = await uezerRepository.getUezers(page, pageSize)
      return reply.status(200).send(uezers)
    },
  )
}
