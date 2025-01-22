import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "@/infra/connection/prisma"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { chatRepository } from "@/repository/chatRepository"

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
      onRequest: [app.authenticate],
    },
    async (request, reply) => {
      // @ts-expect-error - decryptedToken is added by the authenticate hook
      const userId = request.user.id

      const { requestedContactId } = request.params

      const [requestedContact, myContact, chatAlreadyExists] =
        await Promise.all([
          GetUserdataById(requestedContactId),
          GetUserdataById(userId),
          prisma.chat.findFirst({
            where: {
              users: {
                every: {
                  id: {
                    in: [userId, requestedContactId],
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

      if (requestedContactId === userId) {
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

      const chat = await chatRepository.createChat(
        myContact.id,
        requestedContact.id,
      )

      if (!chat) {
        return reply.status(400).send({ message: "Erro ao criar o chat." })
      }

      return reply
        .status(201)
        .send({ message: "Chat criado com sucesso.", chat })
    },
  )
}

function GetUserdataById(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  })
}
