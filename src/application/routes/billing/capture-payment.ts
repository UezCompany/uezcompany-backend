// routes/billing/releasePayment.js

import { stripe } from "@/infra/lib/stripe"
import { FastifyInstance } from "fastify"
import { z } from "zod"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export default async function CapturePayment(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .post("/release-payment", {
      schema: {
        summary: "Capture payment",
        tags: ["Payment"],
        body: z.object({
          paymentIntentId: z.string(),
        })
      },
    }, async (request, reply) => {
      const confirmPaymentBody = z.object({
        paymentIntentId: z.string(),
      })
      const { paymentIntentId } = confirmPaymentBody.parse(request.body)

      try {
        await stripe.paymentIntents.capture(paymentIntentId)
        reply.status(200).send({ message: "Payment released successfully" })
      } catch (error) {
        console.error("Error releasing payment:", error)
        reply.status(500).send({ error: "Internal server error" })
      }
    })
}
