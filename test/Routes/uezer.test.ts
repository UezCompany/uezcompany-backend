import app from "@/application/server"
import { describe, expect, test } from "vitest"
import { login } from "../test-utils"

describe("Uezer Routes", async () => {
  const { token } = await login("uezer@gmail.com", "uezer123")

  test("GET /uezers", async () => {
    const response = await app.inject({
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
      url: `/uezers`,
    })
    expect(response.statusCode).toBe(200)
  })

  test("UPDATE /uezers/:slug", async () => {
    const slug = "uezer"

    const response = await app.inject({
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
      },
      url: `/uezers/${slug}`,
      body: {
        bio: "Gosto muito de trabalhar na escala 8X0",
      },
    })

    expect(response.statusCode).toBe(200)
  })
})
