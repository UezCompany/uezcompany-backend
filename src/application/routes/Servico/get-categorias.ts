import { prisma } from "@/infra/connection/prisma"
import { FastifyInstance } from "fastify"

export default async function GetCategorias(app: FastifyInstance) {
  app.get("/categorias", async (request, reply) => {
    const categorias = await prisma.categorias.findMany()
    return reply.status(200).send(categorias)
  })
}
