import { FastifyInstance } from "fastify"
import { specialityRepository } from "@/repository/SpecialityRepository"
import { z } from "zod"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export default async function GetSpeciality(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/specialities/:id",
    {
      schema: {
        summary: "Get speciality by Id",
        tags: ["Speciality"],
        params: z.object({
          id: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const params = z.object({
        id: z.string().uuid(),
      })
      const { id } = params.parse(request.params)

      const speciality = await specialityRepository.getSpecialitiesById(id)
      return reply.status(200).send(speciality || null)
    },
  )
}
