import { specialityRepository } from "@/repository/SpecialityRepository"
import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export default async function GetSpecialities(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/professions",
    {
      schema: {
        summary: "Get all professions",
        tags: ["Speciality"],
      },
    },
    async (request, reply) => {
      const profissãos = await specialityRepository.getProfessions()
      return reply.status(200).send(profissãos)
    },
  )
}
