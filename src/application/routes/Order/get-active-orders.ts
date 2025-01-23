import { FastifyInstance } from "fastify"
import { orderRepository } from "@/repository/OrderRepository"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import z from "zod"

export default async function GetActiveOrders(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/orders/active",
    {
      schema: {
        summary: "Get all active orders",
        tags: ["Order"],
        querystring: z.object({
          search: z.optional(z.string()),
          orderBy: z
            .enum(["default", "newest", "older", "rentable", "norentable"])
            .default("default"),
          minValue: z.optional(z.coerce.number()),
          maxValue: z.optional(z.coerce.number()),
          toMatch: z.coerce.boolean().optional().default(false),
          profession: z.string().optional(),
          speciality: z.string().optional(),
        }),
      },
      onRequest: [app.authenticate],
    },
    async (request, reply) => {
      const {
        search,
        orderBy,
        minValue,
        maxValue,
        toMatch,
        profession,
        speciality,
      } = request.query
      const orders = await orderRepository.getActiveOrders({
        search,
        orderBy,
        minValue,
        maxValue,
        toMatch,
        profession,
        speciality,
      })
      return reply.status(200).send(orders)
    },
  )
}
