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
      const uzer = await prisma.uzers.findUnique({
        where: { username: slug },
        select: {
          senha: false,
          cpf: false,
          telefone: false,
        },
      })
      if (!uzer) {
        return reply.status(404).send({ message: "Usuário não encontrado" })
      }
      return reply.status(200).send(uzer)
    } else {
      const uzer = await prisma.uzers.findUnique({
        where: { id: slug },
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
      if (!uzer) {
        return reply.status(404).send({ message: "Usuário não encontrado" })
      }
      return reply.status(200).send(uzer)
    }
  })
}
