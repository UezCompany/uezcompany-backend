import { FastifyInstance } from "fastify"
import { z } from "zod"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { uezerRepository } from "@/repository/UezerRepository"

export default async function UpdateUezertBySlug(app: FastifyInstance) {
     app
          .withTypeProvider<ZodTypeProvider>()
          .patch("/uezers/:slug", {
               schema: {
                    summary: "Update an Uezer by Slug (Id or Username)",
                    tags: ["Uezer"],
                    params: z.object({
                         slug: z.string(),
                    }),
                    body: z.object({
                         name: z.string()
                              .min(1, 'O nome não pode estar vazio')
                              .transform((valor) => valor.trim().replace(/\b\w/g, (letra) => letra.toUpperCase()))
                              .optional(),
                         email: z.string().email().optional(),
                         bio: z.string().optional(),
                         birth_date: z.string().optional(),
                         phone: z.string().optional(),
                         username: z.string().toLowerCase().optional(),
                         image: z.string().url().optional(),
                    })
               },
               onRequest: [app.authenticate],
          }, async (request, reply) => {
               const params = z.object({ slug: z.string() })

               const { slug } = params.parse(request.params)

               const uuidSchema = z.string().uuid()
               const { success } = uuidSchema.safeParse(slug)

               const bodyData = request.body

               if (!success) {
                    const uezer = await uezerRepository.getUezerByUsername(slug)

                    if (!uezer) {
                         return reply.status(404).send({ message: "Usuário não encontrado" })
                    }

                    await uezerRepository.updateUezerByUsername(slug, bodyData)

                    return reply.status(200).send(uezer)
               } else {
                    const uezer = await uezerRepository.getUezerById(slug)

                    if (!uezer) {
                         return reply.status(404).send({ message: "Usuário não encontrado" })
                    }

                    await uezerRepository.updateUezerById(slug, bodyData)

                    return reply.status(200).send(uezer)
               }
          })
}
