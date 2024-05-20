import app from "@/application/server"
import { expect, test } from "vitest"

test("GET /categorias", async () => {
  const categoria = await app.inject({
    method: "GET",
    url: `/categorias`,
  })

  expect(categoria.statusCode).toBe(200)
})
