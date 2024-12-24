import app from "@/application/server"
import { describe } from "node:test"
import { expect, test } from "vitest"

describe("Profissãos routes", () => {
  test("GET /profissãos", async () => {
    const profissão = await app.inject({
      method: "GET",
      url: `/professions`,
    })

    expect(profissão.statusCode).toBe(200)
  })
})
