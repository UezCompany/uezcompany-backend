import app from "@/application/server"
import { describe, expect, test } from "vitest"

describe("Cliente routes", async () => {
  const LoginResponse = await app.inject({
    method: "POST",
    url: `/login`,
    payload: {
      email: "cliente@gmail.com",
      password: "cliente123",
    },
  })

  expect(LoginResponse.statusCode, "Cliente logado com sucesso").toBe(200)
  expect(LoginResponse.headers["set-cookie"]).toBeDefined()

  const cookieWithAuthorization = LoginResponse.headers["set-cookie"]

  test("GET /clientes", async () => {
    const response = await app.inject({
      method: "GET",
      headers: {
        cookie: cookieWithAuthorization,
      },
      url: `/clientes`,
    })
    expect(response.statusCode).toBe(200)
  })

  test("GET /clientes/:slug", async () => {
    const slug = "cliente"
    const response = await app.inject({
      method: "GET",
      headers: {
        cookie: cookieWithAuthorization,
      },

      url: `/clientes/${slug}`,
    })

    expect(response.statusCode).toBe(200)
  })
})
