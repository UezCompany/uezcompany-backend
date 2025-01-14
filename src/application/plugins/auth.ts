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
      } catch (err) {
        return reply
          .status(401)
          .send({ message: "Token inválido ou expirado." })
      }
    },
  )
})

export default authPlugin
