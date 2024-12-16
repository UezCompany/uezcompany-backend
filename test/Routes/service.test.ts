import app from "@/application/server"
import { Service } from "@prisma/client"
import { describe, expect, test } from "vitest"

describe("Service Routes", () => {
  let TestServiceRoutes: Service

  test("GET /services", async () => {
    const { statusCode, body } = await app.inject({
      method: "GET",
      url: `/services`,
    })

    TestServiceRoutes = JSON.parse(body)[0]
    expect(statusCode).toBe(200)
  })

  test("GET /services/:id", async () => {
    const id = TestServiceRoutes.id // service id
    const service = await app.inject({
      method: "GET",
      url: `/services/${id}`,
    })

    expect(service.statusCode).toBe(200)
  })

  test("GET /services/category/:categoryName", async () => {
    const categoria = "Programacão" // any category
    const service = await app.inject({
      method: "GET",
      url: `/services/category/${categoria}`,
    })

    expect(service.statusCode).toBe(200)
  })
})
