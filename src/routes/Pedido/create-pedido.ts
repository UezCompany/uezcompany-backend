import { FastifyInstance } from "fastify"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import sendNotification from "@/utils/sendNotification"

export default async function CreatePedido(app: FastifyInstance) {
  app.post("/create/pedido", async (request, reply) => {
    const { token } = request.cookies

    if (!token) {
      return reply.status(401).send({ message: "Token não informado" })
    }

    const decryptedToken: any = app.jwt.verify(token)

    if (!decryptedToken) {
      return reply.status(401).send({ message: "Token inválido ou expirado." })
    }

    const createPedidoBody = z.object({
      categoria: z.string(),
      servicoId: z.string(),
      valor: z.optional(z.number()),
      titulo: z.string(),
    })

    const { servicoId, titulo, valor } = createPedidoBody.parse(request.body)

    const pedido = await prisma.pedidos.create({
      data: {
        idCliente: decryptedToken.id,
        tipo: "ONLINE",
        valor,
        titulo,
        cliente: {
          connect: {
            id: decryptedToken.id,
          },
        },
        servico: {
          connect: {
            id: servicoId,
          },
        },
      },
    })
    if (!pedido) {
      return reply.status(400).send({ message: "Erro ao criar pedido." })
    }

    await sendNotification(
      decryptedToken.id,
      "Em breve um uzer mandará mensagem.",
      "pedLance",
    )

    return reply.status(200).send(pedido)
  })
}
