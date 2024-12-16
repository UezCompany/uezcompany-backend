import app from "@/application/server"
import { describe, expect, test } from "vitest"

describe("Portifolio Route", async () => {
  const userLoginResponse = await app.inject({
    method: "POST",
    url: `/auth`,
    payload: {
      email: "uzer@gmail.com",
      password: "uzer123",
    },
  })

  expect(userLoginResponse.statusCode, "Uzer logado com sucesso").toBe(200)
  expect(userLoginResponse.headers["set-cookie"]).toBeDefined()

  test("GET /portfolio/:slug", async () => {
    const slug = "uzer"

    const cookieWithAuthorization = userLoginResponse.headers["set-cookie"]

    const response = await app.inject({
      method: "GET",
      headers: {
        cookie: cookieWithAuthorization,
      },
      url: `/portfolios/${slug}`,
    })

    expect(response.statusCode).toBe(200)
    // Fazer testes do retorno payload
  })
})
