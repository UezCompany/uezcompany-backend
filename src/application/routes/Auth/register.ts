import { FastifyInstance } from "fastify"
import { prisma } from "@/infra/connection/prisma"
import { z } from "zod"
import bcrypt from "bcrypt"
import { sendNotification } from "@/infra/utils/sendNotification"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { authRepository } from "@/repository/authRepository"

export default async function Register(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/register",
    {
      schema: {
        tags: ["Auth"],
        summary: "Register a user",
        body: z.object({
          name: z
            .string()
            .min(1, "O nome não pode estar vazio")
            .transform((valor) =>
              valor.trim().replace(/\b\w/g, (letra) => letra.toUpperCase()),
            ),
          email: z.string().email(),
          password: z
            .string()
            .min(6, "A senha deve ter pelo menos 6 caracteres"),
          birth_date: z.string(),
          phone: z.optional(z.string()),
          specialityId: z.optional(z.string().uuid()),
          usertype: z.enum(["UEZER", "CLIENT"]),
          username: z.string().toLowerCase(),
          image: z.optional(z.string().url()),
        }),
      },
    },
    async (request, reply) => {
      const {
        name,
        birth_date,
        email,
        password,
        phone,
        username,
        usertype,
        image,
        specialityId,
      } = request.body

      const [userWithThisEmail, userWithThisUsername] = await Promise.all([
        prisma.user.findUnique({ where: { email } }),
        prisma.user.findUnique({ where: { username } }),
      ])

      if (userWithThisEmail || userWithThisUsername) {
        return reply.status(400).send({
          message: "Já existe um usuário com esse email ou username.",
        })
      }

      const newUser = await authRepository.register({
        name,
        birth_date,
        email,
        password,
        phone,
        username,
        usertype,
        image,
        specialityId,
      })

      if (!newUser) {
        return reply.status(500).send({ message: "Erro ao cadastrar." })
      }

      await sendNotification.congratsForSignup(newUser.id, newUser.name)

      return reply.status(201).send({ message: "Usuário criado com sucesso!" })
    },
  )
}
