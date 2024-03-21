import { FastifyInstance } from "fastify"
import { prisma } from "@/lib/prisma"

export default async function GetPedidosByCliente(app: FastifyInstance) {
  app.get("/pedidos/cliente", async (request, reply) => {
    const { token } = request.cookies

    if (!token) {
      return reply.status(401).send({ message: "Token não informado" })
    }

    const decryptedToken: any = app.jwt.verify(token)

    if (!decryptedToken) {
      return reply.status(401).send({ message: "Token inválido ou expirado." })
    }

    const pedidos = await prisma.pedidos.findMany({
      where: {
        clienteId: decryptedToken?.id,
      },
    })
    return reply.status(200).send(pedidos)
  })
}
