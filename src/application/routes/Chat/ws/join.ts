import { Socket } from "socket.io"

export default function JoinSocket(socket: Socket) {
  socket.on("join", () => {
    if (!socket.data.userId) {
      return
    }

    socket.join(socket.data.userId)
  })
}
