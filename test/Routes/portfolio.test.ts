import app from "@/application/server"
import { orderRepository } from "@/repository/OrderRepository"
import { describe, expect, test } from "vitest"

describe("Portifolio Route", async () => {
  const userLoginResponse = await app.inject({
    method: "POST",
    url: `/auth`,
    payload: {
      email: "uezer@gmail.com",
      password: "uezer123",
    },
  })

  expect(userLoginResponse.statusCode, "Uezer logado com sucesso").toBe(200)
  expect(userLoginResponse.headers["set-cookie"]).toBeDefined()

  let orderId: string

  test("POST /portfolios", async () => {
    const cookieWithAuthorization = userLoginResponse.headers["set-cookie"]

    const orders = await orderRepository.getOrders()
    const order = orders.find((order) => order.available === true)

    const response = await app.inject({
      method: "POST",
      headers: {
        cookie: cookieWithAuthorization,
      },
      url: `/portfolios`,
      body: {
        order_id: order?.id,
      },
    })

    const { id } = JSON.parse(response.body)

    orderId = id

    expect(response.statusCode).toBe(201)
  })

  test("Delete /portfolio/:id", async () => {
    const cookieWithAuthorization = userLoginResponse.headers["set-cookie"]

    const response = await app.inject({
      method: "DELETE",
      headers: {
        cookie: cookieWithAuthorization,
      },
      url: `/portfolios/${orderId}`,
    })

    const { Message } = JSON.parse(response.body)

    expect(Message).toBe("O portfolio foi deletado com sucesso")
    expect(response.statusCode).toBe(200)
  })

  test("GET /portfolios/:slug", async () => {
    const slug = "uezer"

    const cookieWithAuthorization = userLoginResponse.headers["set-cookie"]

    const response = await app.inject({
      method: "GET",
      headers: {
        cookie: cookieWithAuthorization,
      },
      url: `/portfolios/${slug}`,
    })

    expect(response.statusCode).toBe(200)
    // Fazer testes do retorno payload
  })
})
