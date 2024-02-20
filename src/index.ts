import { createServer } from "node:http"
import app from "./server"
import initializeWebSocket from "./websocket"

const port = process.env.PORT || 3333
const host = process.env.HOST || "127.0.0.1"

const server = createServer(app)
const io = initializeWebSocket(server)

if (io) {
  console.log("WebSockets iniciado")
}

server.listen(Number(port), host, () => {
  console.log(`Servidor iniciado em http://${host}:${port}`)
})
