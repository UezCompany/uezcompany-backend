import { prisma } from "@/infra/connection/prisma"
import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"

export default async function CreatePortfolio(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/portfolios",
    {
      schema: {
        summary: "Create Portfolio",
        tags: ["Uezer", "Portfolio"],
        body: z.object({
          title: z.string().min(6),
          description: z.optional(z.string().default("")),
          visibility: z.enum(["PUBLIC", "PRIVATE"]).default("PUBLIC"),
          professionId: z.string().uuid(),
          specialities: z.array(z.string().uuid()).default([]),
        }),
      },
      onRequest: [app.authenticate],
    },
    async (request, reply) => {
      const { title, description, visibility, professionId, specialities } =
        request.body

      // @ts-expect-error has id
      const userId = request.user.id

      const portfolio = await prisma.portfolio.create({
        data: {
          title,
          description: description ? description : undefined,
          ownerId: userId,
          visibility,
          professionId,
          specialities: {
            connect: specialities.map((id: string) => ({ id })),
          },
        },
      })

      return reply.status(201).send(portfolio)
    },
  )
}
