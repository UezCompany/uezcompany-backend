import { FastifyInstance } from "fastify"
import { prisma } from "@/infra/connection/prisma"
import { GetUsertypeById } from "@/infra/utils/getUsertypeById"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export default async function GetChats(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/chats",
    {
      schema: {
        summary: "Get all chats",
        tags: ["Chat"],
      },
    },
    async (request, reply) => {
      const { token } = request.cookies
      if (!token) {
        return reply.status(401).send({ message: "Token não informado" })
      }
      const decryptedToken: { id: string } = app.jwt.verify(token)
      if (!decryptedToken) {
        return reply
          .status(401)
          .send({ message: "Token inválido ou expirado." })
      }

      const myUsertype = await GetUsertypeById(decryptedToken.id)
      if (!myUsertype) {
        return reply.status(401).send({ message: "Usuário inválido." })
      }

      if (myUsertype === "CLIENTE") {
        const chats = await prisma.chats.findMany({
          where: {
            idCliente: decryptedToken.id,
          },
          include: {
            messages: true,
            uzer: {
              select: {
                id: true,
                nome: true,
                servico: true,
                photoUrl: true,
                username: true,
              },
            },
          },
        })

        if (!chats) {
          return reply.status(400).send({ message: "Você não tem chats" })
        }

        return reply.status(200).send(chats)
      } else {
        const chats = await prisma.chats.findMany({
          where: {
            idUzer: decryptedToken.id,
          },
          include: {
            messages: true,
            cliente: true,
          },
        })

        if (!chats) {
          return reply.status(400).send({ message: "Você não tem chats" })
        }

        return reply.status(200).send(chats)
      }
    },
  )
}
