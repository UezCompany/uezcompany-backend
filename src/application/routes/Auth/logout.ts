import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export default async function Logout(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/logout",
    {
      schema: {
        summary: "Deauthenticates a user",
        tags: ["Auth"],
      },
    },
    async (request, reply) => {
      reply.clearCookie("token")
      return reply
        .status(200)
        .send({ message: "Logout realizado com sucesso!" })
    },
  )
}
