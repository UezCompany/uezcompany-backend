import { FastifyInstance } from "fastify"
import { serviceRepository } from "@/repository/ServiceRepository"
import { z } from "zod"

export default async function GetServicoByCategoria(app: FastifyInstance) {
  app.get("/servicos/categoria/:categoria", async (request, reply) => {
    const params = z.object({
      categoria: z.string(),
    })
    const { categoria } = params.parse(request.params)

    const servico = await serviceRepository.getServicesByCategory(categoria)
    return reply.status(200).send(servico)
  })
}
