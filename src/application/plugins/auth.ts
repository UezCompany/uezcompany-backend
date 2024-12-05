import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify"
import fp from "fastify-plugin"

const authPlugin: FastifyPluginAsync = fp(async (app) => {
  app.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { token } = request.cookies

      if (!token) {
        return reply.status(401).send({ message: "Token não informado" })
      }

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
