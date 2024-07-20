import { FastifyInstance } from "fastify"
import { serviceRepository } from "@/repository/ServiceRepository"
import { z } from "zod"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export default async function GetServicoByCategoria(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/servicos/categoria/:categoria",
    {
      schema: {
        summary: "Get all services by category",
        tags: ["Service"],
        params: z.object({
          categoria: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const params = z.object({
        categoria: z.string(),
      })
      const { categoria } = params.parse(request.params)

      const servico = await serviceRepository.getServicesByCategory(categoria)
      return reply.status(200).send(servico)
    },
  )
}
