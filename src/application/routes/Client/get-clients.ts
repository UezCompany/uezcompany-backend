import { FastifyInstance } from "fastify"
import { z } from "zod"
import { clientRepository } from "@/repository/ClientRepository"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export default async function GetClients(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/clients",
    {
      schema: {
        summary: "Get all Clients",
        tags: ["Client"],
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
      onRequest: [app.authenticate],
    },
    async (request, reply) => {
      const { page, pageSize } = request.query

      const clients = await clientRepository.getClients(page, pageSize)
      return reply.status(200).send(clients)
    },
  )
}
