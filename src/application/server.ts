import fastify from "fastify"
import fastifyJwt from "@fastify/jwt"
import fastifyCors from "@fastify/cors"
import fastifyCookie from "@fastify/cookie"
import fastifyWebSocket from "fastify-socket.io"
import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUI from "@fastify/swagger-ui"
import fastifyMultipart from "@fastify/multipart"
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod"
import { errorHandler } from "./error-handler"
import { env } from "@/../env"
import authPlugin from "./plugins/auth"
import { SetupRoutes } from "./routes/setup-routes"

const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Uez Company Backend",
      description: "Especificações da API para o backend da UEZ Company",
      version: "1.0",
    },
    servers: [],
  },
  transform: jsonSchemaTransform,
})
app.register(fastifySwaggerUI, {
  routePrefix: "/docs",
})
app.register(fastifyMultipart)
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
app.register(fastifyWebSocket)

app.register(authPlugin)

app.setErrorHandler(errorHandler)

// Setup Routes
SetupRoutes(app)

if (process.env.NODE_ENV !== "test") {
  console.log("CORS Habilitado. URL do domínio: " + env.FRONTEND_DOMAIN || "*")
}

export default app
