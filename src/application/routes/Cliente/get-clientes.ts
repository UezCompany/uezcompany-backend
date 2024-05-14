import { FastifyInstance } from "fastify"
import { z } from "zod"
import { clienteRepository } from "@/repository/ClientRepository"

export default async function GetClientes(app: FastifyInstance) {
  app.get("/clientes", async (request, reply) => {
    const { token } = request.cookies

    if (!token) {
      return reply.status(401).send({ message: "Token não informado" })
    }

    const decryptedToken = app.jwt.verify(token)

    if (!decryptedToken) {
      return reply.status(401).send({ message: "Token inválido ou expirado." })
    }

    const queryParamsSchema = z
      .object({
        page: z.optional(z.string()),
        pageSize: z.optional(z.string()),
      })
      .transform((data) => ({
        page: data.page ? parseInt(data.page, 10) : 1,
        pageSize: data.pageSize ? parseInt(data.pageSize, 10) : 50,
      }))

    const { page, pageSize } = queryParamsSchema.parse(request.query)

    const clientes = await clienteRepository.getClientes(page, pageSize)
    return reply.status(200).send(clientes)
  })
}
