import { FastifyInstance } from "fastify"
import { prisma } from "@/infra/connection/prisma"
import { z } from "zod"
import bcrypt from "bcrypt"
import { sendNotification } from "@/infra/utils/sendNotification"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export default async function CompleteRegister(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/complete-register",
    {
      schema: {
        tags: ["Auth"],
        summary: "Complete a user register",
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
      onRequest: [app.authenticate],
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

      // @ts-expect-error - O usuário está sendo acessado no request
      const userId = request.user?.id

      const updatedUser = await prisma.user.update({
        where: {
          email,
          id: userId,
        },
        data: {
          birth_date,
          name,
          username,
          usertype,
          password: password ? bcrypt.hashSync(password, 10) : null,
          phone: phone ? phone : null,
          image: image ? image : undefined,
          speciality: specialityId
            ? { connect: { id: specialityId } }
            : undefined,
          status: "ACTIVE",
        },
      })

      if (!updatedUser) {
        return reply
          .status(401)
          .send({ message: "Somente o usuário pode completar o cadastro." })
      }

      await sendNotification.congratsForSignup(updatedUser.id, updatedUser.name)

      return reply
        .status(201)
        .send({ message: "Usuário atualizado com sucesso!" })
    },
  )
}
