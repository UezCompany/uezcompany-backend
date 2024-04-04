import { Socket } from "socket.io"

export default function Join(socket: Socket) {
  socket.on("join", () => {
    if (!socket.data.userId) {
      return
    }

    socket.join(socket.data.userId)
  })
}
