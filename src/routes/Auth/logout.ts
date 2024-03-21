import { FastifyInstance } from "fastify"

export default async function Logout(app: FastifyInstance) {
  app.post("/logout", async (request, reply) => {
    reply.clearCookie("token")
    return reply.status(200).send({ message: "Logout realizado com sucesso!" })
  })
}
