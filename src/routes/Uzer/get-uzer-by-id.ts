import { FastifyInstance } from "fastify"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

export default async function GetUzerById(app: FastifyInstance) {
  app.get("/uzers/:id", async (request, reply) => {
    const params = z.object({
      id: z.string(),
    })
    const { id } = params.parse(request.params)

    const { token } = request.cookies
    if (!token) {
      return reply.status(401).send({ message: "Token não informado" })
    }
    const decryptedToken = app.jwt.verify(token)
    if (!decryptedToken) {
      return reply.status(401).send({ message: "Token inválido ou expirado." })
    }

    const uzer = await prisma.uzers.findUnique({ where: { id } })
    return reply.status(200).send(uzer)
  })
}
