import { FastifyInstance } from "fastify"
import { serviceRepository } from "@/repository/ServiceRepository"
import { z } from "zod"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export default async function GetServicesByCategoryName(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/services/category/:categoryName",
    {
      schema: {
        summary: "Get all services by category",
        tags: ["Service"],
        params: z.object({
          categoryName: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { categoryName } = request.params

      const service =
        await serviceRepository.getServicesByCategory(categoryName)
      return reply.status(200).send(service)
    },
  )
}
