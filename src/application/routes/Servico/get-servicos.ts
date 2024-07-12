import { FastifyInstance } from "fastify"
import { serviceRepository } from "@/repository/ServiceRepository"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export default async function GetServicos(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get("/servicos", {
      schema: {
        summary: "Get all services",
        tags: ["Servico"],
      }
    }, async (request, reply) => {
      const servicos = await serviceRepository.getServices()
      return reply.status(200).send(servicos)
    })
}
