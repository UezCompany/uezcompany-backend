import { FastifyInstance } from "fastify"
import { serviceRepository } from "@/repository/ServiceRepository"
import { z } from "zod"

export default async function GetServicoById(app: FastifyInstance) {
  app.get("/servicos/:id", async (request, reply) => {
    const params = z.object({
      id: z.string().uuid(),
    })
    const { id } = params.parse(request.params)

    const servico = await serviceRepository.getServicesById(id)
    return reply.status(200).send(servico || null)
  })
}
