import { describe, expect, test } from "vitest"
import { uzerRepository } from "@/repository/UzerRepository"

describe("Uzer repository", () => {
  let TestUzerRepository: any

  test("Listar todos os clientes do repositorio", async () => {
    const page = 1
    const pageSize = 10
    const uzers = await uzerRepository.getUzers(page, pageSize)
    TestUzerRepository = uzers[0]
    uzers.forEach((uzer) => {
      expect(uzer).toHaveProperty("id")
      expect(uzer).toHaveProperty("username")
    })
  })

  test("Lista um uzer a partir do seu nome", async () => {
    const username = TestUzerRepository.username
    const uzer = await uzerRepository.getUzerByUsername(username)
    expect(uzer).toHaveProperty("id")
    expect(uzer).toHaveProperty("username")
  })

  test("Lista um uzer a partir do seu ID", async () => {
    const id = TestUzerRepository.id
    const uzer = await uzerRepository.getUzerById(id)
    expect(uzer).toHaveProperty("id")
    expect(uzer).toHaveProperty("username")
  })
})
