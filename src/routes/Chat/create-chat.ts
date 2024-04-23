import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { GetUserdataById } from "@/utils/getUserdataById"

export default async function CreateChat(app: FastifyInstance) {
  app.post("/chat/create/:requestedContactId", async (request, reply) => {
    const { token } = request.cookies
    if (!token) {
      return reply.status(401).send({ message: "Token não informado" })
    }
    const decryptedToken: { id: string } = app.jwt.verify(token)
    if (!decryptedToken) {
      return reply.status(401).send({ message: "Token inválido ou expirado." })
    }

    const params = z.object({
      requestedContactId: z.string(),
    })

    const { requestedContactId } = params.parse(request.params)

    const [requestedContact, meContact, chatAlreadyExists] = await Promise.all([
      GetUserdataById(requestedContactId),
      GetUserdataById(decryptedToken.id),
      prisma.chats.findFirst({
        where: {
          OR: [
            {
              idCliente: {
                equals: requestedContactId,
              },
              idUzer: {
                equals: decryptedToken.id,
              },
            },
            {
              idCliente: {
                equals: decryptedToken.id,
              },
              idUzer: {
                equals: requestedContactId,
              },
            },
          ],
        },
      }),
    ])

    if (!requestedContact || !meContact) {
      return reply
        .status(400)
        .send({ message: "O usuário que você deseja chamar não existe." })
    }

    if (requestedContactId === decryptedToken.id) {
      return reply.status(400).send({
        message:
          "O usuário que você deseja chamar não pode ser o mesmo que você.",
      })
    }

    if (requestedContact.tipoUsuario === meContact.tipoUsuario) {
      return reply.status(400).send({
        message: "Os dois usuários devem ser de tipos diferentes.",
      })
    }

    if (chatAlreadyExists) {
      return reply.status(400).send({
        message: "Ja existe uma conversa entre os dois usuários.",
        chatAlreadyExists,
      })
    }

    const chat = await prisma.chats.create({
      data: {
        idCliente:
          meContact.tipoUsuario === "CLIENTE"
            ? meContact.id
            : requestedContact.id,
        idUzer:
          meContact.tipoUsuario === "CLIENTE"
            ? requestedContact.id
            : meContact.id,
      },
    })

    if (!chat) {
      return reply.status(400).send({ message: "Erro ao criar o chat." })
    }

    return reply.status(201).send({ message: "Chat criado com sucesso.", chat })
  })
}
