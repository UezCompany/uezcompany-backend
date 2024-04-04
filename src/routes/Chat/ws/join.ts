import { prisma } from "@/lib/prisma"
import { Socket } from "socket.io"

export default function Join(socket: Socket) {
  socket.on("join", async (userId) => {
    console.log("user joined:", userId)
    socket.data.userId = userId
    // Atualizar o status do usuário para online no banco de dados
    await prisma.uzers.update({
      where: { id: userId },
      data: { lastOnline: null },
    })
    // Emitir evento de usuário conectado
    socket.emit("userConnected", userId)
  })
}
