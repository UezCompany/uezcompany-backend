import { Socket } from "socket.io"

export default function sendMessageForSocket(socket: Socket) {
  socket.on("sendMessage", (message) => {
    console.log("message", message)
    socket.send("Mensagem recebida!")
  })
}
