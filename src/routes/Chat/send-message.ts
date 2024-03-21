import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "@/lib/prisma"

export default async function SendMessage(app: FastifyInstance) {
  app.post("/chat/message", async (request, reply) => {
    const { token } = request.cookies
    if (!token) {
      return reply.status(401).send({ message: "Token não informado" })
    }
    const decryptedToken: { id: string } = app.jwt.verify(token)
    if (!decryptedToken) {
      return reply.status(401).send({ message: "Token inválido ou expirado." })
    }

    const messageBody = z.object({
      content: z.string(),
      chatId: z.string().uuid(),
    })

    const { chatId, content } = messageBody.parse(request.body)

    const chat = await prisma.chats.findFirst({
      where: {
        id: chatId,
      },
    })

    if (!chat) {
      return reply.status(404).send({
        message: "Chat não encontrado.",
      })
    }

    const newMessage = await prisma.messages.create({
      data: {
        content,
        receiverId: chat.receiverId,
        senderId: decryptedToken.id,
        chatId,
      },
    })

    const updatedChat = await prisma.chats.update({
      where: {
        id: chatId,
      },
      data: {
        Messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        Messages: true,
      },
    })

    if (!updatedChat || !newMessage) {
      return reply.status(500).send({
        message: "Erro ao enviar mensagem.",
      })
    }

    return reply.status(201).send({
      message: "Mensagem enviada com sucesso.",
      code: "OK",
    })
  })
}
