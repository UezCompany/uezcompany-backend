import { Server } from "socket.io"

const initializeWebSocket = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  })

  let connectedUsers: string[] = []

  io.on("connection", (socket) => {
    socket.emit("connected", connectedUsers)
    socket.emit("message", "Faça login")
    connectedUsers.push(socket.id)
    console.log(`Um novo usuário se conectou: ${socket.id}`)

    socket.on("message", () => {
      socket.emit("message", "Mensagem recebida!")
    })

    socket.on("disconnect", () => {
      console.log("O usuário com o id " + socket.id + " se desconectou")
      connectedUsers = connectedUsers.filter((user) => user !== socket.id)
    })
  })

  return io
}

export default initializeWebSocket
