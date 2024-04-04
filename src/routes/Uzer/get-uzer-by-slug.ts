import { FastifyInstance } from "fastify"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

export default async function GetUzerBySlug(app: FastifyInstance) {
  app.get("/uzers/:slug", async (request, reply) => {
    const { token } = request.cookies
    if (!token) {
      return reply.status(401).send({ message: "Token não informado" })
    }
    const decryptedToken = app.jwt.verify(token)
    if (!decryptedToken) {
      return reply.status(401).send({ message: "Token inválido ou expirado." })
    }

    const params = z.object({
      slug: z.string(),
    })
    const { slug } = params.parse(request.params)

    const uuidSchema = z.string().uuid()
    const { success } = uuidSchema.safeParse(slug)

    if (!success) {
      const uzer = await prisma.uzers.findUnique({ where: { username: slug } })
      if (!uzer) {
        return reply.status(404).send({ message: "Usuário não encontrado" })
      }
      return reply.status(200).send(uzer)
    } else {
      const uzer = await prisma.uzers.findUnique({ where: { id: slug } })
      if (!uzer) {
        return reply.status(404).send({ message: "Usuário não encontrado" })
      }
      return reply.status(200).send(uzer)
    }
  })
}
