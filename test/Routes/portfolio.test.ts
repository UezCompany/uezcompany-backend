import app from "@/application/server"
import { orderRepository } from "@/repository/OrderRepository"
import { describe, expect, test, beforeAll } from "vitest"
import { login } from "../test-utils"
import { specialityRepository } from "@/repository/SpecialityRepository"
import { portfolioRepository } from "@/repository/portfolioRepository"

describe("Portfolio Route", () => {
  let token: string
  let portfolioId: string
  let portfolioByOrderId: string
  let orders: Array<any> = []

  beforeAll(async () => {
    const { token: userToken } = await login("uezer@gmail.com", "uezer123")
    token = userToken
    orders = await orderRepository.getConcludedOrders()
  })

  test("POST /portfolios", async () => {
    const profession =
      await specialityRepository.getProfessionByName("Programação")
    const specialities =
      await specialityRepository.getSpecialitiesByProfession("Programação")
    const portfolioData = {
      title: "Site pro minininho",
      description: "Faça um site pro mininiho homem.",
      visibility: "PUBLIC",
      professionId: profession?.id,
      specialities: specialities.slice(0, 2).map((speciality) => speciality.id),
    }

    const response = await app.inject({
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
      },
      url: `/portfolios`,
      body: portfolioData,
    })

    const responseBody = JSON.parse(response.body)
    expect(response.statusCode).toBe(201)
    expect(responseBody).toHaveProperty("id")
    portfolioId = responseBody.id // Guardar o ID para os próximos testes
  })

  test("POST /portfolios/orderId", async () => {
    if (!orders.length)
      throw new Error("Nenhum pedido concluido encontrado para o teste.")

    const order = orders[0]

    const response = await app.inject({
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
      },
      url: `/portfolios/${order.id}`,
    })

    const responseBody = JSON.parse(response.body)
    expect(response.statusCode).toBe(201)
    expect(responseBody).toHaveProperty("id")
    portfolioByOrderId = responseBody.id
  })

  test("GET /portfolios/:slug", async () => {
    const slug = "uezer"

    const response = await app.inject({
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
      url: `/portfolios/${slug}`,
    })

    const responseBody = JSON.parse(response.body)

    expect(response.statusCode).toBe(200)
    expect(Array.isArray(responseBody)).toBe(true)
  })

  test("DELETE /portfolio/:id", async () => {
    if (!portfolioId)
      throw new Error("Nenhum portfolioId encontrado para o teste de exclusão.")

    const response = await app.inject({
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
      url: `/portfolios/${portfolioId}`,
    })

    const responseBody = JSON.parse(response.body)

    expect(response.statusCode).toBe(200)
    expect(responseBody.Message).toBe("O portfolio foi deletado com sucesso")
  })

  test("DELETE portfolioByOrderId /portfolio/:id", async () => {
    if (!portfolioByOrderId)
      throw new Error(
        "Nenhum portfolioByOrderId encontrado para o teste de exclusão.",
      )

    const response = await app.inject({
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
      url: `/portfolios/${portfolioByOrderId}`,
    })

    const responseBody = JSON.parse(response.body)

    expect(response.statusCode).toBe(200)
    expect(responseBody.Message).toBe("O portfolio foi deletado com sucesso")
  })
})
