import { FastifyInstance } from "fastify"
import { prisma } from "@/lib/prisma"

export default async function GetServicos(app: FastifyInstance) {
  app.get("/servicos", async (request, reply) => {
    const { token } = request.cookies

    if (!token) {
      return reply.status(401).send({ message: "Token não informado" })
    }

    const decryptedToken = app.jwt.verify(token)

    if (!decryptedToken) {
      return reply.status(401).send({ message: "Token inválido ou expirado." })
    }

    const servicos = await prisma.servicos.findMany()
    return reply.status(200).send(servicos)
  })
}
