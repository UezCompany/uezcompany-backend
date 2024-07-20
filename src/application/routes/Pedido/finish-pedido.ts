import { FastifyInstance } from "fastify"
import { prisma } from "@/infra/connection/prisma"
import { z } from "zod"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export default async function FinishPedido(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/pedidos/finish/:id",
    {
      schema: {
        summary: "Complete the order using Id",
        tags: ["Order"],
        params: z.object({
          id: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { token } = request.cookies

      if (!token) {
        return reply.status(401).send({ message: "Token não informado" })
      }

      const decryptedToken: any = app.jwt.verify(token)

      if (!decryptedToken) {
        return reply
          .status(401)
          .send({ message: "Token inválido ou expirado." })
      }

      const params = z.object({
        id: z.string(),
      })

      const { id } = params.parse(request.params)

      const pedido = await prisma.pedidos.update({
        where: {
          id,
        },
        data: {
          status: "A AVALIAR",
          disponivel: false,
          uzer: {
            connect: {
              id: decryptedToken.id,
            },
          },
        },
      })
      if (!pedido) {
        return reply.status(400).send({ message: "Erro ao atribuir o pedido." })
      }
      return reply.status(200).send(pedido)
    },
  )
}
