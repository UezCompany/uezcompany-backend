import { FastifyInstance } from "fastify"
import { prisma } from "@/infra/connection/prisma"
import { z } from "zod"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { defaultAuthTokenConfig } from "@/infra/utils/cookies/defaultAuthTokenConfig"

export default async function AuthWithGoogle(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/auth/google",
    {
      schema: {
        tags: ["Auth"],
        summary: "Authenticates a user with google",
        body: z.object({
          email: z.string().email(),
          name: z.string(),
          googleId: z.string(),
          access_token: z.string(),
          image: z.optional(z.string().url()),
        }),
        response: {
          200: z.object({
            message: z.string(),
            code: z.string(),
            user: z.object({
              id: z.string(),
              name: z.string(),
              email: z.string(),
              username: z.string().nullable(),
              image: z.string().url(),
              usertype: z.string(),
              status: z.string(),
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
      const { email, name, image } = request.body

      const user = await prisma.user.findUnique({ where: { email } })

      if (!user) {
        const newUser = await prisma.user.create({
          data: {
            email,
            name,
            image: image ? image : undefined,
            usertype: "BOTH",
            status: "INCOMPLETE",
          },
        })

        const token = app.jwt.sign({ id: newUser.id })

        reply.setCookie("token", token, defaultAuthTokenConfig)

        return reply.status(200).send({
          message: "Login realizado com sucesso!",
          code: "AUTHORIZED",
          user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            username: newUser.username,
            image: newUser.image,
            usertype: newUser.usertype,
            status: newUser.status,
          },
          token: token,
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
          status: user.status,
        },
        token: token,
      })
    },
  )
}
