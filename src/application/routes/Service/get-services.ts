import { FastifyInstance } from "fastify"
import { serviceRepository } from "@/repository/ServiceRepository"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export default async function GetServices(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/services",
    {
      schema: {
        summary: "Get all services",
        tags: ["Service"],
      },
    },
    async (request, reply) => {
      const servicos = await serviceRepository.getServices()
      return reply.status(200).send(servicos)
    },
  )
}
