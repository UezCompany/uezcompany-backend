import app from "@/application/server"
import { Servicos } from "@prisma/client"
import { describe, expect, test } from "vitest"

describe("Serviço Routes", () => {
  let TestServiceRoutes: Servicos

  test("GET /servicos", async () => {
    const { statusCode, body } = await app.inject({
      method: "GET",
      url: `/servicos`,
    })

    TestServiceRoutes = JSON.parse(body)[0]
    expect(statusCode).toBe(200)
  })

  test("GET /servicos/:id", async () => {
    const id = TestServiceRoutes.id // ID de um serviço
    const servico = await app.inject({
      method: "GET",
      url: `/servicos/${id}`,
    })

    expect(servico.statusCode).toBe(200)
  })

  test("GET /servicos/categoria/:categoria", async () => {
    const categoria = "Programacão" // qualquer categoria
    const servico = await app.inject({
      method: "GET",
      url: `/servicos/categoria/${categoria}`,
    })

    expect(servico.statusCode).toBe(200)
  })
})
