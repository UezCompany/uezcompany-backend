import { FastifyInstance } from "fastify"
import { specialityRepository } from "@/repository/SpecialityRepository"
import { z } from "zod"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export default async function GetSpecialitiesByProfessionName(
  app: FastifyInstance,
) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/specialities/profession/:professionName",
    {
      schema: {
        summary: "Get all specialities by profession",
        tags: ["Speciality"],
        params: z.object({
          professionName: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { professionName } = request.params

      const speciality =
        await specialityRepository.getSpecialitiesByProfession(professionName)
      return reply.status(200).send(speciality)
    },
  )
}
