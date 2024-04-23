import { stripe } from "@/infra/libs/stripe"
import { FastifyInstance } from "fastify"
import { z } from "zod"

export default async function CreatePaymentIntent(app: FastifyInstance) {
  app.post("/create/paymentIntent", async (request, reply) => {
    const createPaymentBody = z.object({
      amount: z.number(),
      currency: z.string().default("brl"),
      serviceId: z.string(),
    })

    const { amount, currency, serviceId } = createPaymentBody.parse(
      request.body,
    )

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: currency,
        metadata: { serviceId: serviceId },
        automatic_payment_methods: { enabled: true },
      })
      return reply
        .status(200)
        .send({ clientSecret: paymentIntent.client_secret })
    } catch (error) {
      console.error("Error creating payment:", error)
      return reply.status(500).send({ error: "Internal server error" })
    }
  })
}
