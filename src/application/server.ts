import fastify from "fastify"
import fastifyJwt from "@fastify/jwt"
import fastifyCors from "@fastify/cors"
import fastifyCookie from "@fastify/cookie"
import fastifyWebSocket from "fastify-socket.io"
import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUI from "@fastify/swagger-ui"
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod"
import { Server } from "socket.io"
import { errorHandler } from "./error-handle"
import GetClients from "./routes/Client/get-clients"
import GetUzers from "./routes/Uzer/get-uzers"
import GetServices from "./routes/Service/get-services"
import GetService from "./routes/Service/get-service"
import GetServicesByCategoryName from "./routes/Service/get-services-by-category-name"
import GetCategories from "./routes/Service/get-categories"
import Register from "./routes/Auth/register"
import GetOrders from "./routes/Order/get-orders"
import GetOrdersCreatedByUser from "./routes/Order/get-orders-created-by-user"
import GetOrdersAssignedsToUser from "./routes/Order/get-orders-assigneds-to-user"
import GetActiveOrders from "./routes/Order/get-active-orders"
import AssignOrderToUzer from "./routes/Order/assign-order-to-uzer"
import CreateOrder from "./routes/Order/create-order"
import FinishOrder from "./routes/Order/finish-order"
import RateOrder from "./routes/Order/rate-order"
import GetUserNotifications from "./routes/Notification/get-notifications"
import ReadNotification from "./routes/Notification/read-notification"
import ReadAllNotificacions from "./routes/Notification/read-all-notifications"
import Login from "./routes/Auth/login"
import Logout from "./routes/Auth/logout"
import CreateChat from "./routes/Chat/create-chat"
import GetChats from "./routes/Chat/get-chats"
import GetUzerBySlug from "./routes/Uzer/get-uzer-by-slug"
import GetClient from "./routes/Client/get-client"
import GetPortfolios from "./routes/Uzer/Portfolio/get-portfolios"
import MessageForSocket from "./routes/Chat/ws/send-message"
import JoinSocket from "./routes/Chat/ws/join"
import BudgetForSocket from "./routes/Chat/ws/send-budget"
import GetOrdersById from "./routes/Order/get-order-by-id"
import LoginWithGoogle from "./routes/Auth/login-google"
import { env } from "@/../env"

const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)
app.setErrorHandler(errorHandler)
app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "Uez Company Backend",
      description: "Especificações da API para o backend da UEZ Company",
      version: "1.1.0",
    },
  },
  transform: jsonSchemaTransform,
})
app.register(fastifySwaggerUI, {
  routePrefix: "/docs",
})

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

// Auth
app.register(Register)
app.register(Login)
app.register(Logout)
app.register(LoginWithGoogle)
// Client
app.register(GetClients)
app.register(GetClient)
// Uzer
app.register(GetUzers)
app.register(GetUzerBySlug)
app.register(GetPortfolios)
// Service
app.register(GetServices)
app.register(GetService)
app.register(GetServicesByCategoryName)
app.register(GetCategories)
// Order
app.register(GetOrders)
app.register(GetOrdersById)
app.register(GetOrdersCreatedByUser)
app.register(GetOrdersAssignedsToUser)
app.register(GetActiveOrders)
app.register(AssignOrderToUzer)
app.register(CreateOrder)
app.register(FinishOrder)
app.register(RateOrder)
// Notification
app.register(GetUserNotifications)
app.register(ReadNotification)
app.register(ReadAllNotificacions)
// Chat
app.register(CreateChat)
app.register(GetChats)

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
    socket.data.userId = decryptedToken.id
    BudgetForSocket(socket)
    JoinSocket(socket)
    MessageForSocket(socket)
    socket.on("disconnect", () => {
      socket.disconnect()
    })
  })
})

export default app

declare module "fastify" {
  interface FastifyInstance {
    io: Server
  }
}
