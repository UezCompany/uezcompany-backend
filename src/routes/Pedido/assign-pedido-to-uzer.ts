import { FastifyInstance } from "fastify"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

export default async function AssignPedido(app: FastifyInstance) {
  app.put("/pedido/assignUzer/:id", async (request, reply) => {
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

    const assignUzerBody = z.object({
      valor: z.optional(z.number()),
      idUzer: z.string(),
    })

    const { valor, idUzer } = assignUzerBody.parse(request.body)

    const pedido = await prisma.pedidos
      .update({
        where: {
          id,
        },
        data: {
          status: "EM ANDAMENTO",
          disponivel: false,
          valor,
          uzer: {
            connect: {
              id: idUzer,
            },
          },
        },
      })
      .catch((err) => {
        console.log(err)
      })
    if (!pedido) {
      return reply.status(400).send({ message: "Erro ao atribuir o pedido." })
    }

    return reply.status(200).send(pedido)
  })
}
