import { prisma } from "@/lib/prisma"
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
        type: "TEXT",
        Chat: {
          connect: {
            id: chatId,
          },
        },
      },
    })

    // console.log(`emiting to ${receiverId}`, newMessage)
    // console.log(`emiting to ${myId}`, newMessage)

    socket.to(receiverId).emit("message", newMessage)
    return socket.to(myId).emit("message", newMessage)
  })
}
