import { assert, describe, expect, test } from "vitest"
import { specialityRepository } from "@/repository/SpecialityRepository"
import { Speciality } from "@prisma/client"

const fields = ["id", "name", "type", "description"]

describe("Speciality repository", () => {
  let TestSpecialityRepository: Speciality

  test("Listar todos os Especialidades", async () => {
    const specialities = await specialityRepository.getSpecialities()
    assert(Array.isArray(specialities), "Expected an array of specialities")
    // @ts-expect-error test
    TestSpecialityRepository = specialities[0]
    specialities.forEach((speciality) => {
      fields.forEach((field) => {
        expect(speciality).toHaveProperty(field)
      })
    })
  })

  test("Listar todos os Especialidades pela profissão", async () => {
    const profession = "Programação"
    const specialities =
      await specialityRepository.getSpecialitiesByProfession(profession)
    fields.forEach((field) => {
      expect(specialities[0]).toHaveProperty(field)
    })
  })

  test("Listar todos os Especialidades pelo id", async () => {
    const id = TestSpecialityRepository.id
    const speciality = await specialityRepository.getSpecialitiesById(id)
    fields.forEach((field) => {
      expect(speciality).toHaveProperty(field)
    })
  })

  test("Listar todas as profissãos", async () => {
    const profissãos = await specialityRepository.getProfessions()
    const profissão = profissãos[0]
    assert(Array.isArray(profissãos), "Expected an array of profissãos")
    expect(profissão).toHaveProperty("id")
  })
})
