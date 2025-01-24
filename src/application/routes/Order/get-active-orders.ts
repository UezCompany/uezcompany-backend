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
        querystring: z
          .object({
            search: z.optional(z.string()),
            orderBy: z
              .enum(["default", "newest", "older", "rentable", "norentable"])
              .default("default"),
            minValue: z.optional(z.coerce.number()),
            maxValue: z.optional(z.coerce.number()),
            toMatch: z.coerce.boolean().optional().default(false),
            profession: z.string().optional(),
            speciality: z.string().optional(),
            page: z.optional(z.string()),
            pageSize: z.optional(z.string()),
          })
          .transform((data) => ({
            ...data,
            page: data.page ? parseInt(data.page, 10) : 1,
            pageSize: data.pageSize ? parseInt(data.pageSize, 10) : 50,
          })),
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
        page,
        pageSize,
      } = request.query
      const orders = await orderRepository.getActiveOrders(page, pageSize, {
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
