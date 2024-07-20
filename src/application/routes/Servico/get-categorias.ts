import { serviceRepository } from "@/repository/ServiceRepository"
import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export default async function GetCategorias(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/categorias",
    {
      schema: {
        summary: "Get all categories",
        tags: ["Service"],
      },
    },
    async (request, reply) => {
      const categorias = await serviceRepository.getCategories()
      return reply.status(200).send(categorias)
    },
  )
}
