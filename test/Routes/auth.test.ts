import app from "@/application/server"
import { prisma } from "@/infra/connection/prisma"
import { describe, expect, test } from "vitest"

/*
  name,
  email,
  password,
  birth_date,
  phone,
  username,
  usertype,
  image,
  serviceId,
*/

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

  test("POST /login", async () => {
    const response = await app.inject({
      method: "POST",
      url: `/login`,
      payload: {
        email: "joao.silva@example.com",
        password: "senhaSegura123",
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
    const response = await prisma.user.delete({
      where: {
        email: "joao.silva@example.com",
      },
    })

    console.log(response)

    expect(response.email).toBe("joao.silva@example.com")
    expect(response).not.toBeNull()
  })
})
