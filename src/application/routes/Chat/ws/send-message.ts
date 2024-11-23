import { prisma } from "@/infra/connection/prisma"
import { Socket } from "socket.io"
import { z } from "zod"

export default function MessageForSocket(socket: Socket) {
  socket.on("message", async (res) => {
    const validateSchema = z.object({
      chatId: z.string(),
      content: z.string(),
      receiverId: z.string(),
    })

    const { chatId, content, receiverId } = validateSchema.parse(res)

    const myId = socket.data.userId

    const newMessage = await prisma.message.create({
      data: {
        content,
        senderId: myId,
        receiverId,
        chat: {
          connect: {
            id: chatId,
          },
        },
      },
    })

    return socket.to(receiverId).emit("message", newMessage)
  })
}
