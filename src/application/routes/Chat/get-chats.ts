import { FastifyInstance } from "fastify"
import { prisma } from "@/infra/connection/prisma"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { chatRepository } from "@/repository/chatRepository"

export default async function GetChats(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/chats",
    {
      schema: {
        summary: "Get all chats",
        tags: ["Chat"],
      },
      onRequest: [app.authenticate],
    },
    async (request, reply) => {
      // @ts-expect-error - decryptedToken is added by the authenticate hook
      const userId = request.user.id

      const chats = await chatRepository.getChatById(userId)

      if (!chats) {
        return reply.status(400).send({ message: "Você não tem chats" })
      }

      return reply.status(200).send(chats)
    },
  )
}
