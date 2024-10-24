import app from "@/application/server"
import { describe, expect, test } from "vitest"

describe("Uzer Routes", async () => {
  const LoginResponse = await app.inject({
    method: "POST",
    url: `/login`,
    payload: {
      email: "uzer@gmail.com",
      password: "uzer123",
    },
  })

  expect(LoginResponse.statusCode, "Uzer logado com sucesso").toBe(200)
  expect(LoginResponse.headers["set-cookie"]).toBeDefined()

  const cookieWithAuthorization = LoginResponse.headers["set-cookie"]

  test("GET /uzers", async () => {
    const response = await app.inject({
      method: "GET",
      headers: {
        cookie: cookieWithAuthorization,
      },
      url: `/uzers`,
    })
    expect(response.statusCode).toBe(200)
  })

  test("GET /uzers/:slug", async () => {
    const slug = "uzer"

    const cookieWithAuthorization = LoginResponse.headers["set-cookie"]

    const response = await app.inject({
      method: "GET",
      headers: {
        cookie: cookieWithAuthorization,
      },
      url: `/uzers/${slug}`,
    })

    expect(response.statusCode).toBe(200)
    // Fazer testes do retorno payload
  })
})
