import { FastifyInstance } from "fastify"
import { serviceRepository } from "@/repository/ServiceRepository"
import { z } from "zod"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export default async function GetService(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/services/:id",
    {
      schema: {
        summary: "Get service by Id",
        tags: ["Service"],
        params: z.object({
          id: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const params = z.object({
        id: z.string().uuid(),
      })
      const { id } = params.parse(request.params)

      const service = await serviceRepository.getServicesById(id)
      return reply.status(200).send(service || null)
    },
  )
}
