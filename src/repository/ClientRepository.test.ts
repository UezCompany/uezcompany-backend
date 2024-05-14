import { describe, expect, test } from "vitest"
import { clientRepository } from "./ClientRepository"

describe("Client repository", () => {
  let TestClientRepository: any

  test("Listar todos os clientes do repositorio", async () => {
    const page = 1
    const pageSize = 10
    const clients = await clientRepository.getClients(page, pageSize)
    TestClientRepository = clients[0]
    clients.forEach((client) => {
      expect(client).toHaveProperty("id")
      expect(client).toHaveProperty("username")
    })
  })

  test("Lista um cliente a partir do seu username", async () => {
    const username = TestClientRepository.username
    const client = await clientRepository.getClientByUsername(username)
    expect(client).toHaveProperty("id")
    expect(client).toHaveProperty("username")
  })

  test("Lista um cliente a partir do seu ID", async () => {
    const id = TestClientRepository.id
    const client = await clientRepository.getClientById(id)
    expect(client).toHaveProperty("id")
    expect(client).toHaveProperty("username")
  })
})
