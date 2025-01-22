import { prisma } from "@/infra/connection/prisma"
import { chatRepository } from "@/repository/chatRepository"
import { Socket } from "socket.io"
import { z } from "zod"

export default function BudgetForSocket(socket: Socket) {
  socket.on("budget", async (res: any) => {
    const validateSchema = z.object({
      chatId: z.string(),
      value: z.number(),
      idPedido: z.string(),
      receiverId: z.string(),
    })

    const { chatId, value, idPedido, receiverId } = validateSchema.parse(res)

    const myId = socket.data.userId

    const newMessage = await chatRepository.sendBudget(
      chatId,
      value,
      idPedido,
      receiverId,
      myId,
    )

    socket.to(myId).emit("message", newMessage)
    return socket.to(receiverId).emit("message", newMessage)
  })
}
