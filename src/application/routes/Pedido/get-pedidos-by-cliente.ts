import { FastifyInstance } from "fastify"
import { prisma } from "@/infra/connection/prisma"
import { z } from "zod"

export default async function GetPedidosByCliente(app: FastifyInstance) {
  app.get("/pedidos/cliente/:id", async (request, reply) => {
    const { token } = request.cookies

    if (!token) {
      return reply.status(401).send({ message: "Token não informado" })
    }

    const decryptedToken: any = app.jwt.verify(token)

    if (!decryptedToken) {
      return reply.status(401).send({ message: "Token inválido ou expirado." })
    }

    const params = z.object({
      id: z.string(),
    })

    const { id } = params.parse(request.params)

    const pedidos = await prisma.pedidos.findMany({
      where: {
        idCliente: id,
      },
    })
    return reply.status(200).send(pedidos)
  })
}
