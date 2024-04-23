import { FastifyInstance } from "fastify"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

export default async function GetUzers(app: FastifyInstance) {
  app.get("/uzers", async (request, reply) => {
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

    const offset = (page <= 1 ? 0 : page - 1) * pageSize

    const uzers = await prisma.uzers.findMany({
      skip: offset,
      take: pageSize,
      select: {
        id: true,
        username: true,
        nome: true,
        email: true,
        situacao: true,
        motivoBloqueio: true,
        cep: true,
        logradouro: true,
        numero: true,
        complemento: true,
        bairro: true,
        cidade: true,
        estado: true,
        dataNascimento: true,
        dataCadastro: true,
        telefone: true,
        tipoUsuario: true,
        quantidadePedidos: true,
        photoUrl: true,
        quantidadePedidosRealizados: true,
        idServico: true,
        avaliacao: true,
        lastOnline: true,
        lastLogin: true,
        bannerUrl: true,
        bio: true,
      },
    })
    return reply.status(200).send(uzers)
  })
}
