import app from "@/application/server"
import { serviceRepository } from "@/repository/ServiceRepository"
import { Order } from "@prisma/client"
import { describe, expect, test } from "vitest"

describe("Pedido routes", async () => {
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

  test("GET /pedidos", async () => {
    const response = await app.inject({
      method: "GET",
      headers: {
        cookie: cookieWithAuthorizationClient,
      },
      url: `/pedidos`,
    })

    expect(response.statusCode).toBe(200)
  })

  test("GET /pedidos/:id", async () => {
    const id = "05674702-a26d-4c74-b8b5-f9a40e9a82eb" //colocar um id de pedido do banco

    const response = await app.inject({
      method: "GET",
      headers: {
        cookie: cookieWithAuthorizationClient,
      },
      url: `/pedidos/${id}`,
    })

    expect(response.statusCode).toBe(200)
  })

  test("GET /pedidos/uzer", async () => {
    const response = await app.inject({
      method: "GET",
      headers: {
        cookie: cookieWithAuthorizationClient,
      },
      url: `/pedidos/uzer`,
    })

    expect(response.statusCode).toBe(200)
  })

  test("GET /pedidos/cliente/:id", async () => {
    const id = JSON.parse(clientLoginResponse.body).user.id

    const response = await app.inject({
      method: "GET",
      headers: {
        cookie: cookieWithAuthorizationClient,
      },
      url: `/pedidos/cliente/${id}`,
    })

    expect(response.statusCode).toBe(200)
  })

  test("GET /pedidosativos", async () => {
    const response = await app.inject({
      method: "GET",
      headers: {
        cookie: cookieWithAuthorizationClient,
      },
      url: `/pedidosativos`,
    })

    expect(response.statusCode).toBe(200)
  })

  let pedido: Order

  test("POST /create/pedido", async () => {
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
      url: `/create/pedido`,
    })

    expect(JSON.parse(response.body)).toHaveProperty("id")
    expect(response.statusCode).toBe(201)

    pedido = JSON.parse(response.body)
  })

  test("PUT /pedidos/finish/:id", async () => {
    const id = pedido.id
    const response = await app.inject({
      method: "PUT",
      headers: {
        cookie: cookieWithAuthorizationUzer,
      },
      url: `/pedidos/finish/${id}`,
    })

    expect(response.statusCode).toBe(200)
  })

  test("PUT /pedido/avaliar/:id", async () => {
    const id = pedido.id
    const response = await app.inject({
      method: "PUT",
      headers: {
        cookie: cookieWithAuthorizationClient,
      },
      body: {
        rating: 5,
      },
      url: `/pedido/avaliar/${id}`,
    })

    expect(response.statusCode).toBe(200)
  })

  test("PUT /pedido/assignUzer/:id", async () => {
    const id = pedido.id
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
      url: `/pedido/assignUzer/${id}`,
    })

    expect(response.statusCode).toBe(200)
  })
})
