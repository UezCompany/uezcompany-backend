import { FastifyInstance } from "fastify"
import { z } from "zod"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { prisma } from "@/infra/connection/prisma"

export default async function ForgotPassword(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/forgot-password",
    {
      schema: {
        tags: ["Auth"],
        summary: "Forgot password",
        body: z.object({
          email: z.string().email(),
        }),
      },
    },
    async (request, reply) => {
      const { email } = request.body
      console.log(email)

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (!user) {
        return reply.status(404).send({ message: "Usuário nao encontrado" })
      }

      return reply.status(200).send({ message: "Email enviado com sucesso!" })
    },
  )
}
