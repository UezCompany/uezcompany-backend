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

    const newMessage = await prisma.messages.create({
      data: {
        content,
        senderId: myId,
        receiverId,
        Chat: {
          connect: {
            id: chatId,
          },
        },
      },
    })

    console.log(socket.rooms.has(receiverId))

    return socket.to(receiverId).emit("message", newMessage)
  })
}
