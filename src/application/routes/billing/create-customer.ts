import { prisma } from "@/infra/connection/prisma"
import { stripe } from "@/infra/lib/stripe"
import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export default async function CreateCustomer(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/create/customer",
    {
      schema: {
        summary: "Create a customer",
        tags: ["Payment"],
      },
    },
    async (request, reply) => {
      const { token } = request.cookies
      if (!token) {
        return reply.status(401).send({ message: "Token não informado" })
      }
      const decryptedToken: { id: string } = app.jwt.verify(token)
      if (!decryptedToken) {
        return reply
          .status(401)
          .send({ message: "Token inválido ou expirado." })
      }

      // Aqui você pode adicionar a lógica para criar o cliente
      const user =
        (await prisma.clientes.findUnique({
          where: {
            id: decryptedToken.id,
          },
        })) ||
        (await prisma.uzers.findUnique({
          where: {
            id: decryptedToken.id,
          },
        }))
      if (!user) {
        return reply.status(404).send({ message: "Usuário não encontrado" })
      }

      try {
        const customer = await stripe.customers.create({
          email: user.email,
          phone: user.telefone,
          address: {
            city: user.cidade,
            country: "BR",
            line1: user.logradouro,
            postal_code: user.cep,
            state: user.estado,
          },
          metadata: {
            id: user.id,
          },
          name: user.nome,
        })
        reply.status(200).send({
          message: "Usuário criado com sucesso",
          code: "OK",
          email: customer.email,
        })
      } catch (error) {
        console.error("Error creating customer:", error)
        reply.status(500).send({ error: "Internal server error" })
      }
    },
  )
}
