import app from "@/application/server"
import { describe, expect, test } from "vitest"

describe("Cliente routes", async () => {
  const LoginResponse = await app.inject({
    method: "POST",
    url: `/auth`,
    payload: {
      email: "cliente@gmail.com",
      password: "cliente123",
    },
  })

  expect(LoginResponse.statusCode, "Cliente logado com sucesso").toBe(200)
  expect(LoginResponse.headers["set-cookie"]).toBeDefined()

  const cookieWithAuthorization = LoginResponse.headers["set-cookie"]

  test("GET /clients", async () => {
    const response = await app.inject({
      method: "GET",
      headers: {
        cookie: cookieWithAuthorization,
      },
      url: `/clients`,
    })
    expect(response.statusCode).toBe(200)
  })

  test("GET /clients/:slug", async () => {
    const slug = "cliente"
    const response = await app.inject({
      method: "GET",
      headers: {
        cookie: cookieWithAuthorization,
      },

      url: `/clients/${slug}`,
    })

    expect(response.statusCode).toBe(200)
  })
})
