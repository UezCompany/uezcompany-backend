import { FastifyInstance } from "fastify"
import { z } from "zod"
import { clienteRepository } from "@/repository/ClienteRepository"

export default async function GetClienteBySlug(app: FastifyInstance) {
  app.get("/clientes/:slug", async (request, reply) => {
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
      const cliente = await clienteRepository.getClienteByUsername(slug)
      if (!cliente) {
        return reply.status(404).send({ message: "Usuário não encontrado" })
      }
      return reply.status(200).send(cliente)
    } else {
      const cliente = await clienteRepository.getClienteById(slug)
      if (!cliente) {
        return reply.status(404).send({ message: "Usuário não encontrado" })
      }
      return reply.status(200).send(cliente)
    }
  })
}
