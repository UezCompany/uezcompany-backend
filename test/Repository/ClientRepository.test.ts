import { describe, expect, test } from "vitest"
import { clientRepository } from "@/repository/ClientRepository"

const fields = ["id", "username", "name", "email", "status", "block_reason"]

describe("Client repository", () => {
  let TestClientRepository: any

  test("Listar todos os clientes do repositorio", async () => {
    const page = 1
    const pageSize = 10
    const clients = await clientRepository.getClients(page, pageSize)
    TestClientRepository = clients[0]
    clients.forEach((client) => {
      fields.forEach((field) => {
        expect(client).toHaveProperty(field)
      })
    })
  })

  test("Lista um cliente a partir do seu username", async () => {
    const username = TestClientRepository.username
    const client = await clientRepository.getClientByUsername(username)
    fields.forEach((field) => {
      expect(client).toHaveProperty(field)
    })
  })

  test("Lista um cliente a partir do seu ID", async () => {
    const id = TestClientRepository.id
    const client = await clientRepository.getClientById(id)
    fields.forEach((field) => {
      expect(client).toHaveProperty(field)
    })
  })
})
