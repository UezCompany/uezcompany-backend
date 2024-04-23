import { FastifyInstance } from "fastify"
import { prisma } from "@/infra/connection/prisma"

export default async function GetServicos(app: FastifyInstance) {
  app.get("/servicos", async (request, reply) => {
    const servicos = await prisma.servicos.findMany()
    return reply.status(200).send(servicos)
  })
}
