import { FastifyInstance } from "fastify"
import { prisma } from "@/infra/connection/prisma"
import { z } from "zod"
import bcrypt from "bcrypt"
import sendNotification from "@/infra/utils/sendNotification"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export default async function Register(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/register",
    {
      schema: {
        tags: ["Auth"],
        summary: "Register a user",
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          password: z
            .string()
            .min(6, "A senha deve ter pelo menos 6 caracteres"),
          birth_date: z.string(),
          phone: z.optional(z.string()),
          serviceId: z.optional(z.string().uuid()),
          usertype: z.enum(["UZER", "CLIENT"]),
          username: z.string(),
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
        serviceId,
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

      const newUser = await prisma.user.create({
        data: {
          birth_date,
          email,
          name,
          username,
          usertype,
          password: password ? bcrypt.hashSync(password, 10) : null,
          phone: phone ? phone : null,
          image: image ? image : undefined,
          service: serviceId ? { connect: { id: serviceId } } : undefined,
        },
      })
      console.log("chegou aqui")

      if (!newUser) {
        return reply.status(500).send({ message: "Erro ao cadastrar." })
      }

      await sendNotification(
        newUser.id,
        `Seja bem-vindo(a) ${newUser.name}, ficamos muito felizes em ter você conosco!`,
        "parabens",
      )

      return reply.status(201).send({ message: "Usuário criado com sucesso!" })
    },
  )
}
