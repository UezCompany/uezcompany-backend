import fastify from "fastify"
import fastifyJwt from "@fastify/jwt"
import fastifyCors from "@fastify/cors"
import fastifyCookie from "@fastify/cookie"
import fastifyWebSocket from "fastify-socket.io"
import GetClientes from "./routes/Cliente/get-clientes"
import GetUzers from "./routes/Uzer/get-uzers"
import GetServicos from "./routes/Servico/get-servicos"
import GetServicoById from "./routes/Servico/get-servico-by-id"
import GetServicoByCategoria from "./routes/Servico/get-servicos-by-categoria"
import GetCategorias from "./routes/Servico/get-categorias"
import Register from "./routes/Auth/register"
import GetPedidos from "./routes/Pedido/get-pedidos"
import GetPedidosByCliente from "./routes/Pedido/get-pedidos-by-cliente"
import GetPedidosByUzer from "./routes/Pedido/get-pedidos-by-uzer"
import GetActivePedidos from "./routes/Pedido/get-active-pedidos"
import AssignPedido from "./routes/Pedido/assign-pedido-to-uzer"
import CreatePedido from "./routes/Pedido/create-pedido"
import FinishPedido from "./routes/Pedido/finish-pedido"
import AvaliarPedido from "./routes/Pedido/avaliar-pedido"
import GetUserNotifications from "./routes/Notificacao/get-notificacoes"
import ReadNotificacao from "./routes/Notificacao/read-notificacao"
import ReadAllNotificacoes from "./routes/Notificacao/read-all-notificacao"
import "dotenv/config"
import Login from "./routes/Auth/login"
import Logout from "./routes/Auth/logout"
import { env } from "../env"
import CreateChat from "./routes/Chat/create-chat"
import GetChats from "./routes/Chat/get-chats"
import ConfirmPayment from "./routes/billing/confirm-payment"
import SendMessage from "./routes/Chat/send-message"
import { Server } from "socket.io"
import GetUzerBySlug from "./routes/Uzer/get-uzer-by-slug"
import GetClienteBySlug from "./routes/Cliente/get-cliente-by-slug"
import GetPortfolios from "./routes/Uzer/Portfolio/get-portfolios"
import Join from "./routes/Chat/ws/join"
import MessageForSocket from "./routes/Chat/ws/send-message"

const app = fastify()

app.register(fastifyCors, {
  origin: true,
  credentials: true,
})

app.register(fastifyJwt, {
  secret: env.SECRET || "SECRET CABULOSO",
})

app.register(fastifyCookie, {
  secret: env.SECRET || "SECRET CABULOSO",
  hook: "onRequest",
})

app.register(fastifyWebSocket)

app.get("/", (req, reply) => {
  reply.status(200).send({ message: "Server is running" })
})

// ROTEAMENTO - Auth
app.register(Register)
app.register(Login)
app.register(Logout)
// Cliente
app.register(GetClientes)
app.register(GetClienteBySlug)
// Uzer
app.register(GetUzers)
app.register(GetUzerBySlug)
app.register(GetPortfolios)
// Servico
app.register(GetServicos)
app.register(GetServicoById)
app.register(GetServicoByCategoria)
app.register(GetCategorias)
// Pedido
app.register(GetPedidos)
app.register(GetPedidosByCliente)
app.register(GetPedidosByUzer)
app.register(GetActivePedidos)
app.register(AssignPedido)
app.register(CreatePedido)
app.register(FinishPedido)
app.register(AvaliarPedido)
// Notificacoes
app.register(GetUserNotifications)
app.register(ReadNotificacao)
app.register(ReadAllNotificacoes)
// Chat
app.register(CreateChat)
app.register(GetChats)
app.register(SendMessage)

//Billing
app.register(ConfirmPayment)

if (process.env.NODE_ENV !== "test") {
  console.log("CORS Habilitado. URL do domínio: " + env.FRONTEND_DOMAIN || "*")
}

app.ready(() => {
  app.io = new Server(app.server, {
    cors: {
      origin: env.FRONTEND_DOMAIN || "*",
    },
  })
  app.io.on("connection", (socket) => {
    const token = socket.handshake.auth?.token
    if (!token) {
      return
    }
    const decryptedToken: { id: string } = app.jwt.verify(token)
    if (!decryptedToken) {
      return
    }
    // console.log("Token > id: ", decryptedToken.id)
    console.log("Socket conectado: ", socket.id)
    socket.data.userId = decryptedToken.id
    Join(socket)
    MessageForSocket(socket)
    socket.on("disconnect", () => {
      socket.disconnect()
      console.log("Socket desconectado: ", socket.id)
    })
  })
})

export default app

declare module "fastify" {
  interface FastifyInstance {
    io: Server
  }
}
