import { FastifyInstance } from "fastify"
import { prisma } from "@/infra/connection/prisma"
import { z } from "zod"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { defaultAuthTokenConfig } from "@/infra/utils/cookies/defaultAuthTokenConfig"

export default async function LoginWithGoogle(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/login/google",
    {
      schema: {
        tags: ["Auth"],
        summary: "Authenticates a user with google",
        body: z.object({
          email: z.string().email(),
          name: z.string(),
          googleId: z.string(),
          access_token: z.string(),
        }),
        response: {
          200: z.object({
            message: z.string(),
            code: z.string(),
            user: z.object({
              id: z.string(),
              name: z.string(),
              email: z.string(),
              username: z.string(),
              image: z.string().url(),
              usertype: z.string(),
            }),
            token: z.string(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { access_token, email, name, googleId } = request.body

      const user = await prisma.user.findUnique({ where: { email } })

      if (!user) {
        return reply.status(404).send({
          message:
            "Usuário não encontrado, preencha o cadastro para prosseguir",
          code: "NOT_FOUND",
        })
      }

      const token = app.jwt.sign({ id: user.id })

      reply.setCookie("token", token, defaultAuthTokenConfig)

      return reply.status(200).send({
        message: "Login realizado com sucesso!",
        code: "AUTHORIZED",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.username,
          image: user.image,
          usertype: user.usertype,
        },
        token: token,
      })
    },
  )
}
