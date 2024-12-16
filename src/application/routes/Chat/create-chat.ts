import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "@/infra/connection/prisma"
import { GetUserdataById } from "@/infra/utils/getUserdataById"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export default async function CreateChat(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/chat/create/:requestedContactId",
    {
      schema: {
        summary: "Create a chat by contact Id",
        tags: ["Chat"],
        params: z.object({
          requestedContactId: z.string(),
        }),
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

      const { requestedContactId } = request.params

      const [requestedContact, myContact, chatAlreadyExists] =
        await Promise.all([
          GetUserdataById(requestedContactId),
          GetUserdataById(decryptedToken.id),
          prisma.chat.findFirst({
            where: {
              users: {
                every: {
                  id: {
                    in: [decryptedToken.id, requestedContactId],
                  },
                },
              },
            },
          }),
        ])

      if (!requestedContact || !myContact) {
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

      if (requestedContact.usertype === myContact.usertype) {
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

      const chat = await prisma.chat.create({
        data: {
          users: {
            connect: [{ id: myContact.id }, { id: requestedContact.id }],
          },
        },
      })

      if (!chat) {
        return reply.status(400).send({ message: "Erro ao criar o chat." })
      }

      return reply
        .status(201)
        .send({ message: "Chat criado com sucesso.", chat })
    },
  )
}
