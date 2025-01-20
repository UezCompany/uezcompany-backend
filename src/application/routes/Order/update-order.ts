import { FastifyInstance } from "fastify"
import { z } from "zod"
import { sendNotification } from "@/infra/utils/sendNotification"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { orderRepository } from "@/repository/OrderRepository"

export default async function UpdateOrder(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().patch(
    "/orders/:orderId",
    {
      schema: {
        summary: "Update an order",
        tags: ["Order"],
        params: z.object({
          orderId: z.string(),
        }),
        body: z.object({
          title: z.optional(z.string()),
          description: z.optional(z.string()),
          professionId: z.optional(z.string()),
          specialityId: z.optional(z.string()),
          value: z.optional(z.number()),
        }),
      },
      onRequest: [app.authenticate],
    },
    async (request, reply) => {
      const { orderId } = request.params
      const { title, description, professionId, specialityId, value } =
        request.body

      //@ts-expect-error has id
      const userId = request.user.id

      const respectiveOrder = await orderRepository.getOrderById(orderId)

      if (respectiveOrder?.clientId !== userId) {
        return reply
          .status(401)
          .send({ message: "Somente quem criou o pedido pode edita-lo" })
      }

      if (respectiveOrder?.status !== "OPEN") {
        return reply
          .status(400)
          .send({ message: "Só é possivel editar pedidos em aberto." })
      }

      const order = await orderRepository.updateOrder(orderId, {
        title,
        description,
        value,
        speciality: specialityId
          ? { connect: { id: specialityId } }
          : undefined,
      })

      if (!order) {
        return reply.status(400).send({ message: "Erro ao atualizar pedido." })
      }

      return reply.status(200).send(order)
    },
  )
}
