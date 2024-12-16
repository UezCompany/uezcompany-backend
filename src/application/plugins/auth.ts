import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify"
import fp from "fastify-plugin"
import { env } from "@/../env"

const authPlugin: FastifyPluginAsync = fp(async (app) => {
  app.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const apiKey = request.headers["x-api-key"]
      const { token } = request.cookies

      // Permitir acesso com chave API válida
      if (apiKey && apiKey === env.SERVICE_API_KEY) {
        console.log("Acesso permitido com chave API")
        return // Acesso permitido
      }

      // Verificar token JWT nos cookies
      if (!token) {
        return reply.status(401).send({ message: "Token não informado" })
      }

      try {
        const decryptedToken = app.jwt.verify(token) as FastifyRequest["user"]
        request.user = decryptedToken
        console.log("Acesso permitido com token JWT")
      } catch (err) {
        return reply
          .status(401)
          .send({ message: "Token inválido ou expirado." })
      }
    },
  )
})

export default authPlugin
