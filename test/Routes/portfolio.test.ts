import app from "@/application/server"
import { orderRepository } from "@/repository/OrderRepository"
import { describe, expect, test, beforeAll } from "vitest"
import { login } from "../test-utils"

describe("Portifolio Route", () => {
  let token: string
  let porfolioId: string
  let orders: Array<any> = []

  beforeAll(async () => {
    const { token: userToken } = await login("uezer@gmail.com", "uezer123")
    token = userToken
    orders = await orderRepository.getOrders()
  })

  test("POST /portfolios", async () => {
    const order = orders.find((order) => order.available === true)

    const response = await app.inject({
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
      },
      url: `/portfolios`,
      body: {
        orderId: order?.id,
      },
    })

    console.log(response)

    expect(response.statusCode).toBe(201)
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
    console.log("a", await JSON.parse(response.body)[0].id)

    porfolioId = await JSON.parse(response.body)[0].id

    expect(response.statusCode).toBe(200)
    // Fazer testes do retorno payload
  })

  test("Delete /portfolio/:id", async () => {
    const response = await app.inject({
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
      url: `/portfolios/${porfolioId}`,
    })

    const { Message } = JSON.parse(response.body)

    expect(Message).toBe("O portfolio foi deletado com sucesso")
    expect(response.statusCode).toBe(200)
  })
})
