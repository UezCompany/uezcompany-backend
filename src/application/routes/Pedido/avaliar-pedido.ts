import { FastifyInstance } from "fastify"
import { prisma } from "@/infra/connection/prisma"
import { z } from "zod"
import sendNotification from "@/infra/utils/sendNotification"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export default async function AvaliarPedido(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .put("/pedido/avaliar/:id", {
      schema: {
        summary: "Evaluate the order through the Id",
        tags: ["Pedido"],
        params: z.object({
          id: z.string().uuid(),
        }),
      }
    }, async (request, reply) => {
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

      const avaliarPedidoBody = z.object({
        avaliacao: z.number(),
      })

      const { avaliacao } = avaliarPedidoBody.parse(request.body)

      const estaAvaliado = await prisma.pedidos.findUnique({
        where: {
          id,
          avaliado: true,
        },
      })

      if (estaAvaliado) {
        return reply.status(400).send({ message: "O pedido ja foi avaliado." })
      }

      const pedido = await prisma.pedidos.update({
        where: { id },
        data: {
          avaliado: true,
          avaliacao: Number(avaliacao),
          status: "CONCLUIDO",
        },
      })

      const uzer = await prisma.uzers.update({
        where: {
          id: pedido.idUzer || "",
        },
        data: {
          avaliacoes: {
            push: avaliacao,
          },
        },
      })

      const newAvaliacao =
        uzer.avaliacoes.length === 0
          ? avaliacao
          : (uzer.avaliacoes.reduce(
            (acc, curr) => Number(acc) + Number(curr),
            0,
          ) +
            Number(avaliacao)) /
          uzer.avaliacoes.length +
          1
      const uzerAvaliado = await prisma.uzers.update({
        where: {
          id: uzer.id,
        },
        data: {
          avaliacao: newAvaliacao,
        },
      })

      if (!uzerAvaliado || !pedido) {
        return reply.status(400).send({ message: "Erro ao avaliar o pedido." })
      }

      await sendNotification(
        uzer.id,
        `R$ ${pedido.valor} do serviço ${pedido.titulo} já está na sua carteira`,
        "servAval",
      )

      return reply
        .status(200)
        .send({ message: "O pedido foi avaliado com sucesso.", pedido })
    })
}
