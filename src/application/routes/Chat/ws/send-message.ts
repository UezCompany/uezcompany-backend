import { prisma } from "@/infra/connection/prisma"
import { chatRepository } from "@/repository/chatRepository"
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

    const newMessage = await chatRepository.sendMessage(content, chatId, receiverId, myId)

    return socket.to(receiverId).emit("message", newMessage)
  })
}
