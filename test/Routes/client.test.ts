import app from "@/application/server"
import { describe, expect, test } from "vitest"
import { login } from "../test-utils"

describe("Cliente routes", async () => {
  const { token } = await login("cliente@gmail.com", "cliente123")

  test("GET /clients", async () => {
    const response = await app.inject({
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
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
        authorization: `Bearer ${token}`,
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
        authorization: `Bearer ${token}`,
      },
      url: `/clients/${slug}`,
      body: {
        bio: "Eu acho que esse teste funcionou",
      },
    })

    expect(response.statusCode).toBe(200)
  })
})
