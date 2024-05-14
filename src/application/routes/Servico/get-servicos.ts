import { FastifyInstance } from "fastify"
import { serviceRepository } from "@/repository/ServiceRepository"

export default async function GetServicos(app: FastifyInstance) {
  app.get("/servicos", async (request, reply) => {
    const servicos = await serviceRepository.getServices()
    return reply.status(200).send(servicos)
  })
}
