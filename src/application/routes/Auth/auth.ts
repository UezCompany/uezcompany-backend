import { FastifyInstance } from "fastify"
import { prisma } from "@/infra/connection/prisma"
import { z } from "zod"
import bcrypt from "bcrypt"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { defaultAuthTokenConfig } from "@/infra/utils/cookies/defaultAuthTokenConfig"

export default async function Auth(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/auth",
    {
      schema: {
        tags: ["Auth"],
        summary: "Authenticates a user",
        body: z.object({
          email: z.string().email(),
          password: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      const user = await prisma.user.findUnique({ where: { email } })

      if (!user || !user.password) {
        return reply.status(404).send({ message: "Usuário não encontrado" })
      }

      if (bcrypt.compareSync(password, user.password)) {
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            last_login: new Date(),
          },
        })

        const token = app.jwt.sign({ id: user.id })

        reply.setCookie("token", token, defaultAuthTokenConfig)

        console.log("Login do ip: " + request.ip)

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
      } else {
        return reply
          .status(401)
          .send({ message: "Credenciais inválidas", code: "UNAUTHORIZED" })
      }
    },
  )
}
