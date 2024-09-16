import app from "@/application/server"
import { prisma } from "@/infra/connection/prisma"
import { describe, expect, test } from "vitest"

describe("Auth routes", async () => {
  test("POST /register", async () => {
    const response = await app.inject({
      method: "POST",
      url: `/register`,
      payload: {
        nome: "João Silva",
        email: "joao.silva@example.com",
        senha: "senhaSegura123",
        cpf: "123.456.789-00",
        dataNasc: "01/01/1990",
        cep: "12345-678",
        telefone: "(11) 91234-5678",
        bairro: "Centro",
        cidade: "São Paulo",
        estado: "SP",
        logradouro: "Rua Exemplo",
        numero: "123",
        complemento: "Apto 45",
        idServico: "001",
        usertype: "CLIENTE",
        username: "joaosilva",
      },
    })

    expect(response.statusCode).toBe(201)
    expect(JSON.parse(response.body)).toHaveProperty(
      "message",
      "Usuário criado com sucesso!",
    )
  })

  let cookieWithAuthorization: string | any

  test("POST /login", async () => {
    const response = await app.inject({
      method: "POST",
      url: `/login`,
      payload: {
        email: "joao.silva@example.com",
        senha: "senhaSegura123",
      },
    })

    cookieWithAuthorization = response.headers["set-cookie"]

    expect(response.statusCode, "Cliente logado com sucesso").toBe(200)
    expect(response.headers["set-cookie"]).toBeDefined()
  })

  test("POST /logout", async () => {
    const response = await app.inject({
      method: "POST",
      url: `/logout`,
      headers: {
        cookie: cookieWithAuthorization,
      },
    })

    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.body)).toHaveProperty(
      "message",
      "Logout realizado com sucesso!",
    )
  })

  test("DELETE user", async () => {
    const response = await prisma.clientes.delete({
      where: {
        email: "joao.silva@example.com",
      },
    })
    expect(response.email).toBe("joao.silva@example.com")
    expect(response).not.toBeNull()
  })
})
