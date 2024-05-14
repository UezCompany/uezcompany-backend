import { serviceRepository } from "@/repository/ServiceRepository"
import { FastifyInstance } from "fastify"

export default async function GetCategorias(app: FastifyInstance) {
  app.get("/categorias", async (request, reply) => {
    const categorias = await serviceRepository.getCategories()
    return reply.status(200).send(categorias)
  })
}
