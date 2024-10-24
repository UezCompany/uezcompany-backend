import app from "@/application/server"
import { orderRepository } from "@/repository/OrderRepository"
import { serviceRepository } from "@/repository/ServiceRepository"
import { Order } from "@prisma/client"
import { describe, expect, test } from "vitest"

describe("Order routes", async () => {
  const clientLoginResponse = await app.inject({
    method: "POST",
    url: `/login`,
    payload: {
      email: "cliente@gmail.com",
      password: "cliente123",
    },
  })

  expect(clientLoginResponse.statusCode, "Cliente logado com sucesso").toBe(200)
  expect(clientLoginResponse.headers["set-cookie"]).toBeDefined()

  const uzerLoginResponse = await app.inject({
    method: "POST",
    url: `/login`,
    payload: {
      email: "uzer@gmail.com",
      password: "uzer123",
    },
  })

  expect(uzerLoginResponse.statusCode, "Cliente logado com sucesso").toBe(200)
  expect(uzerLoginResponse.headers["set-cookie"]).toBeDefined()

  const cookieWithAuthorizationClient =
    clientLoginResponse.headers["set-cookie"]
  const cookieWithAuthorizationUzer = uzerLoginResponse.headers["set-cookie"]

  test("GET /orders", async () => {
    const response = await app.inject({
      method: "GET",
      headers: {
        cookie: cookieWithAuthorizationClient,
      },
      url: `/orders`,
    })

    expect(response.statusCode).toBe(200)
  })

  test("GET /orders/:orderId", async () => {
    const orders = await orderRepository.getOrders()
    const order = orders[0]

    const response = await app.inject({
      method: "GET",
      headers: {
        cookie: cookieWithAuthorizationClient,
      },
      url: `/orders/${order.id}`,
    })

    expect(response.statusCode).toBe(200)
  })

  test("GET /orders/:userId/assigned-orders", async () => {
    const response = await app.inject({
      method: "GET",
      headers: {
        cookie: cookieWithAuthorizationClient,
      },
      url: `/orders/${
        JSON.parse(uzerLoginResponse.body).user.id
      }/assigned-orders`,
    })

    expect(response.statusCode).toBe(200)
  })

  test("GET /orders/:userId/created-orders", async () => {
    const id = JSON.parse(clientLoginResponse.body).user.id

    const response = await app.inject({
      method: "GET",
      headers: {
        cookie: cookieWithAuthorizationClient,
      },
      url: `/orders/${id}/created-orders`,
    })

    expect(response.statusCode).toBe(200)
  })

  test("GET /orders/active", async () => {
    const response = await app.inject({
      method: "GET",
      headers: {
        cookie: cookieWithAuthorizationClient,
      },
      url: `/orders/active`,
    })

    expect(response.statusCode).toBe(200)
  })

  let order: Order

  test("POST /orders", async () => {
    const category = "Programação"
    const arrayOfServices =
      await serviceRepository.getServicesByCategory(category)
    const service = arrayOfServices[0]

    const response = await app.inject({
      method: "POST",
      headers: {
        cookie: cookieWithAuthorizationClient,
      },
      body: {
        category: category,
        serviceId: service.id,
        value: 123,
        title: "Teste de serviço",
      },
      url: `/orders`,
    })

    expect(JSON.parse(response.body)).toHaveProperty("id")
    expect(response.statusCode).toBe(201)

    order = JSON.parse(response.body)
  })

  test("PUT /orders/:orderId/finish", async () => {
    const id = order.id
    const response = await app.inject({
      method: "PUT",
      headers: {
        cookie: cookieWithAuthorizationUzer,
      },
      url: `/orders/${id}/finish`,
    })

    expect(response.statusCode).toBe(200)
  })

  test("PUT /order/:orderId/rate", async () => {
    const id = order.id
    const response = await app.inject({
      method: "PUT",
      headers: {
        cookie: cookieWithAuthorizationClient,
      },
      body: {
        rating: 5,
      },
      url: `/orders/${id}/rate`,
    })

    expect(response.statusCode).toBe(200)
  })

  test("PUT /order/:orderId/assign", async () => {
    const id = order.id
    const uzerId = JSON.parse(uzerLoginResponse.body).user.id
    const response = await app.inject({
      method: "PUT",
      headers: {
        cookie: cookieWithAuthorizationClient,
      },
      body: {
        value: 5,
        uzerId,
      },
      url: `/orders/${id}/assign`,
    })

    expect(response.statusCode).toBe(200)
  })
})
