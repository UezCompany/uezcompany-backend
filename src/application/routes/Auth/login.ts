import { FastifyInstance } from "fastify"
import { prisma } from "@/infra/connection/prisma"
import { z } from "zod"
import bcrypt from "bcrypt"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { defaultAuthTokenConfig } from "@/infra/utils/cookies/defaultAuthTokenConfig"

export default async function Login(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/login",
    {
      schema: {
        tags: ["Auth"],
        summary: "Authenticates a user",
        body: z.object({
          email: z.string().email(),
          senha: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { email, senha } = request.body

      const user =
        (await prisma.clientes.findFirst({ where: { email } })) ??
        (await prisma.uzers.findFirst({ where: { email } }))

      if (!user) {
        return reply.status(404).send({ message: "Usuário não encontrado" })
      }

      if (bcrypt.compareSync(senha, user.senha)) {
        if (user.tipoUsuario === "CLIENTE") {
          await prisma.clientes.update({
            where: {
              id: user.id,
            },
            data: {
              lastLogin: new Date(),
            },
          })
        } else {
          await prisma.uzers.update({
            where: {
              id: user.id,
            },
            data: {
              lastLogin: new Date(),
            },
          })
        }

        const token = app.jwt.sign({ id: user.id })

        reply.setCookie("token", token, defaultAuthTokenConfig)

        console.log("Login do ip: " + request.ip)

        return reply.status(200).send({
          message: "Login realizado com sucesso!",
          code: "AUTHORIZED",
          user: {
            id: user.id,
            nome: user.nome,
            email: user.email,
            username: user.username,
            photoUrl: user.photoUrl,
            userType: user.tipoUsuario,
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
