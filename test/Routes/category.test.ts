import app from "@/application/server"
import { describe } from "node:test"
import { expect, test } from "vitest"

describe("Categorias routes", () => {
  test("GET /categorias", async () => {
    const categoria = await app.inject({
      method: "GET",
      url: `/categories`,
    })

    expect(categoria.statusCode).toBe(200)
  })
})
