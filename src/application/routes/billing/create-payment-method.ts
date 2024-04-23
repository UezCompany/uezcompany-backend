import { stripe } from "@/infra/libs/stripe"
import { FastifyInstance } from "fastify"
import { z } from "zod"

export default async function CreatePaymentMethod(app: FastifyInstance) {
  app.post("/create/paymentMethod", async (request, reply) => {
    const createPaymentMethodBody = z.object({
      paymentMethodId: z.string(),
      customerId: z.string(),
    })
    const { paymentMethodId, customerId } = createPaymentMethodBody.parse(
      request.body,
    )

    // Aqui você pode adicionar a lógica para criar o método de pagamento no Stripe
    try {
      await stripe.paymentMethods.attach(paymentMethodId, {
        customer: customerId,
      })
      reply
        .status(200)
        .send({ message: "Método de pagamento criado com sucesso" })
    } catch (error) {
      console.error("Error creating payment method:", error)
      reply.status(500).send({ error: "Internal server error" })
    }
  })
}
