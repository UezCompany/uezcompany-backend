// import { stripe } from "@/infra/lib/stripe"
// import { FastifyInstance } from "fastify"
// import { z } from "zod"
// import { ZodTypeProvider } from "fastify-type-provider-zod"

// export default async function ConfirmPayment(app: FastifyInstance) {
//   app.withTypeProvider<ZodTypeProvider>().post(
//     "/confirm-payment",
//     {
//       schema: {
//         summary: "Confirm payment",
//         tags: ["Payment"],
//         body: z.object({
//           paymentIntentId: z.string(),
//         }),
//       },
//     },
//     async (request, reply) => {
//       const confirmPaymentBody = z.object({
//         paymentIntentId: z.string(),
//       })
//       const { paymentIntentId } = confirmPaymentBody.parse(request.body)
//       try {
//         const paymentIntent =
//           await stripe.paymentIntents.confirm(paymentIntentId)
//         // Aplicar taxa de 5%
//         const amountAfterFee = Math.ceil(paymentIntent.amount * 0.95)
//         // Aqui você pode adicionar a lógica para guardar o valor descontado
//         reply.status(200).send({ amountAfterFee: amountAfterFee })
//       } catch (error) {
//         console.error("Error confirming payment:", error)
//         reply.status(500).send({ error: "Internal server error" })
//       }
//     },
//   )
// }
