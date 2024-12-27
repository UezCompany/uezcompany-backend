import { describe, expect, test } from "vitest"
import { uezerRepository } from "@/repository/UezerRepository"

const fields = ["id", "username", "name", "status"]

describe("Uezer repository", () => {
  let TestUezerRepository: any

  test("Listar todos os clientes do repositorio", async () => {
    const page = 1
    const pageSize = 10
    const uezers = await uezerRepository.getUezers(page, pageSize)
    TestUezerRepository = uezers[0]

    uezers.forEach((uezer) => {
      fields.forEach((field) => {
        expect(uezer).toHaveProperty(field)
      })
    })
  })

  test("Lista um uezer a partir do seu nome", async () => {
    const username = TestUezerRepository.username
    const uezer = await uezerRepository.getUezerByUsername(username)
    fields.forEach((field) => {
      expect(uezer).toHaveProperty(field)
    })
  })

  test("Lista um uezer a partir do seu ID", async () => {
    const id = TestUezerRepository.id
    const uezer = await uezerRepository.getUezerById(id)
    fields.forEach((field) => {
      expect(uezer).toHaveProperty(field)
    })
  })
})
