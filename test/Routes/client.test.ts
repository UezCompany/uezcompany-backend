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

  const cookieWithAuthorization = JSON.parse(LoginResponse.body).token
  // const cookieWithAuthorization = global.authorization.tokenClient

  test("GET /clients", async () => {
    const response = await app.inject({
      method: "GET",
      headers: {
        authorization: `Bearer ${cookieWithAuthorization}`,
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
        authorization: `Bearer ${cookieWithAuthorization}`,
      },

      url: `/clients/${slug}`,
    })

    expect(response.statusCode).toBe(200)
  })

  test("UPDATE /clients/:slug", async () => {
    const slug = "cliente"
    const response = await app.inject({
      method: "PATCH",
      headers: {
        authorization: `Bearer ${cookieWithAuthorization}`,
      },
      url: `/clients/${slug}`,
      body: {
        bio: "Eu acho que esse teste funcionou",
      },
    })

    console.log(JSON.parse(response.body))
    expect(response.statusCode).toBe(200)
  })
})
