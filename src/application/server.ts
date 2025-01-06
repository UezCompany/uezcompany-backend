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
import { errorHandler } from "./error-handler"
import MessageForSocket from "./routes/Chat/ws/send-message"
import JoinSocket from "./routes/Chat/ws/join"
import BudgetForSocket from "./routes/Chat/ws/send-budget"
import { env } from "@/../env"
import authPlugin from "./plugins/auth"
import { SetupRoutes } from "./routes/setup-routes"

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
app.register(fastifyCookie, {
  secret: env.SECRET || "SECRET CABULOSO",
  hook: "onRequest",
})
app.register(fastifyJwt, {
  secret: env.SECRET || "SECRET CABULOSO",
})

app.register(authPlugin)

app.register(fastifyWebSocket)

SetupRoutes(app)

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
