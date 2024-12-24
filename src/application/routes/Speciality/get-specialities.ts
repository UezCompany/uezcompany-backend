import { FastifyInstance } from "fastify"
import { specialityRepository } from "@/repository/SpecialityRepository"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export default async function GetSpecialities(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/specialities",
    {
      schema: {
        summary: "Get all specialities",
        tags: ["Speciality"],
      },
    },
    async (request, reply) => {
      const specialities = await specialityRepository.getSpecialities()
      return reply.status(200).send(specialities)
    },
  )
}
