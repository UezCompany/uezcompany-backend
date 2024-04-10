import { FastifyInstance } from "fastify"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

export default async function GetServicoById(app: FastifyInstance) {
  app.get("/servicos/:id", async (request, reply) => {
    const params = z.object({
      id: z.string().uuid(),
    })
    const { id } = params.parse(request.params)

    const servico = await prisma.servicos.findUnique({
      where: { id },
      include: {
        categoria: true,
      },
    })
    return reply.status(200).send(servico || null)
  })
}
