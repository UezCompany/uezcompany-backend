import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify"
import fp from "fastify-plugin"
import { env } from "@/../env"

const authPlugin: FastifyPluginAsync = fp(async (app) => {
  app.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      // checando se tem chave de API
      const apiKey = request.headers["x-api-key"]
      if (apiKey && apiKey === env.SERVICE_API_KEY) {
        const bearerToken = request.headers.authorization

        // Verificar token JWT opcional nos cookies
        if (bearerToken && bearerToken.startsWith("Bearer ")) {
          try {
            const token = bearerToken.replace("Bearer ", "")
            const decryptedToken = app.jwt.verify(token)
            request.user = decryptedToken
          } catch {
            return
          }
        }
        return // Acesso permitido
      }

      const bearerToken = request.headers.authorization

      // Verificar token JWT nos cookies
      if (!bearerToken) {
        return reply.status(401).send({ message: "Token não informado" })
      }

      const token = bearerToken.replace("Bearer ", "")

      try {
        const decryptedToken = app.jwt.verify(token) as FastifyRequest["user"]
        request.user = decryptedToken
      } catch {
        return reply
          .status(401)
          .send({ message: "Token inválido ou expirado." })
      }
    },
  )
})

export default authPlugin
