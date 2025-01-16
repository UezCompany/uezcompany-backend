import app from "@/application/server"
import { prisma } from "@/infra/connection/prisma"
import { describe, expect, test } from "vitest"

describe("Auth routes", async () => {
  test("POST /register", async () => {
    const response = await app.inject({
      method: "POST",
      url: `/register`,
      payload: {
        name: "João Silva",
        email: "joao.silva@example.com",
        password: "senhaSegura123",
        birth_date: "01/01/1990",
        phone: "(11) 91234-5678",
        username: "joaosilva",
        usertype: "CLIENT",
      },
    })

    expect(response.statusCode).toBe(201)
    expect(JSON.parse(response.body)).toHaveProperty(
      "message",
      "Usuário criado com sucesso!",
    )
  })

  let cookieWithAuthorization: string | any

  test("POST /auth", async () => {
    const response = await app.inject({
      method: "POST",
      url: `/auth`,
      payload: {
        email: "joao.silva@example.com",
        password: "senhaSegura123",
      },
    })

    cookieWithAuthorization = JSON.parse(response.body).token

    expect(response.statusCode, "Cliente logado com sucesso").toBe(200)
  })

  test("POST /logout", async () => {
    const response = await app.inject({
      method: "POST",
      url: `/logout`,
      headers: {
        authorization: `Bearer ${cookieWithAuthorization}`,
      },
    })

    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.body)).toHaveProperty(
      "message",
      "Logout realizado com sucesso!",
    )
  })

  test("DELETE user", async () => {
    const response = await prisma.user.delete({
      where: {
        email: "joao.silva@example.com",
      },
    })

    expect(response.email).toBe("joao.silva@example.com")
    expect(response).not.toBeNull()
  })
})
