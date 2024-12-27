import app from "@/application/server"
import { describe, expect, test } from "vitest"

describe("Uezer Routes", async () => {
  const LoginResponse = await app.inject({
    method: "POST",
    url: `/auth`,
    payload: {
      email: "uezer@gmail.com",
      password: "uezer123",
    },
  })

  expect(LoginResponse.statusCode, "Uezer logado com sucesso").toBe(200)
  expect(LoginResponse.headers["set-cookie"]).toBeDefined()

  const cookieWithAuthorization = LoginResponse.headers["set-cookie"]

  test("GET /uezers", async () => {
    const response = await app.inject({
      method: "GET",
      headers: {
        cookie: cookieWithAuthorization,
      },
      url: `/uezers`,
    })
    expect(response.statusCode).toBe(200)
  })

  test("GET /uezers/:slug", async () => {
    const slug = "uezer"

    const cookieWithAuthorization = LoginResponse.headers["set-cookie"]

    const response = await app.inject({
      method: "GET",
      headers: {
        cookie: cookieWithAuthorization,
      },
      url: `/uezers/${slug}`,
    })

    expect(response.statusCode).toBe(200)
    // Fazer testes do retorno payload
  })
})
