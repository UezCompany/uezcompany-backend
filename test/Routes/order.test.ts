import app from "@/application/server"
import { orderRepository } from "@/repository/OrderRepository"
import { specialityRepository } from "@/repository/SpecialityRepository"
import { Order } from "@prisma/client"
import { describe, expect, test, beforeAll, afterAll } from "vitest"
import { login } from "../test-utils"

describe("Order routes", () => {
  let clientToken: string, clientId: string
  let uezerToken: string, uezerId: string
  let order: Order

  beforeAll(async () => {
    // Login de cliente e uzer usando a função abstraída
    const client = await login("cliente@gmail.com", "cliente123")
    clientToken = client.token
    clientId = client.user.id

    const uezer = await login("uezer@gmail.com", "uezer123")
    uezerToken = uezer.token
    uezerId = uezer.user.id
  })

  test("GET /orders", async () => {
    const response = await app.inject({
      method: "GET",
      headers: { authorization: `Bearer ${clientToken}` },
      url: `/orders`,
    })
    expect(response.statusCode).toBe(200)
  })

  test("GET /orders/:orderId", async () => {
    const orders = await orderRepository.getOrders()
    const order = orders[0]

    const response = await app.inject({
      method: "GET",
      headers: { authorization: `Bearer ${clientToken}` },
      url: `/orders/${order.id}`,
    })
    expect(response.statusCode).toBe(200)
  })

  test("GET /orders/:userId/assigned-orders", async () => {
    const response = await app.inject({
      method: "GET",
      headers: { authorization: `Bearer ${uezerToken}` },
      url: `/orders/${uezerId}/assigned-orders`,
    })
    expect(response.statusCode).toBe(200)
  })

  test("GET /orders/:userId/created-orders", async () => {
    const response = await app.inject({
      method: "GET",
      headers: { authorization: `Bearer ${clientToken}` },
      url: `/orders/${clientId}/created-orders`,
    })
    expect(response.statusCode).toBe(200)
  })

  test("GET /orders/active", async () => {
    const response = await app.inject({
      method: "GET",
      headers: { authorization: `Bearer ${clientToken}` },
      url: `/orders/active`,
    })
    expect(response.statusCode).toBe(200)
  })

  test("POST /orders", async () => {
    const profession = "Programação"
    const arrayOfSpecialities =
      await specialityRepository.getSpecialitiesByProfession(profession)
    const speciality = arrayOfSpecialities[0]

    const response = await app.inject({
      method: "POST",
      headers: { authorization: `Bearer ${clientToken}` },
      body: {
        profession: profession,
        specialityId: speciality.id,
        value: 123,
        title: "Teste de Especialidade",
      },
      url: `/orders`,
    })

    expect(response.statusCode).toBe(201)
    order = JSON.parse(response.body)
    expect(order).toHaveProperty("id")
  })

  test("PATCH /orders/:orderId", async () => {
    const updateData = {
      title: "Updated Order Title",
      description: "Updated Order Description",
      value: 999,
    }

    const response = await app.inject({
      method: "PATCH",
      headers: { authorization: `Bearer ${clientToken}` },
      url: `/orders/${order.id}`,
      body: updateData,
    })

    expect(response.statusCode).toBe(200)
    const updatedOrder = JSON.parse(response.body)
    expect(updatedOrder).toHaveProperty("id", order.id)
    expect(updatedOrder).toHaveProperty("title", updateData.title)
    expect(updatedOrder).toHaveProperty("description", updateData.description)
    expect(updatedOrder).toHaveProperty("value", updateData.value)
  })

  test("PATCH /orders/:orderId/finish", async () => {
    const response = await app.inject({
      method: "PATCH",
      headers: { authorization: `Bearer ${uezerToken}` },
      url: `/orders/${order.id}/finish`,
    })
    expect(response.statusCode).toBe(200)
  })

  test("PATCH /order/:orderId/rate", async () => {
    const response = await app.inject({
      method: "PATCH",
      headers: { authorization: `Bearer ${clientToken}` },
      body: {
        feedback: "O serviço ficou muito bem feito, parabéns!",
        satisfaction: 5,
        speed: 4.5,
        execution: 5,
      },
      url: `/orders/${order.id}/rate`,
    })
    expect(response.statusCode).toBe(200)
  })

  test("PATCH /order/:orderId/assign", async () => {
    const response = await app.inject({
      method: "PATCH",
      headers: { authorization: `Bearer ${clientToken}` },
      body: { value: 5, uezerId },
      url: `/orders/${order.id}/assign`,
    })
    expect(response.statusCode).toBe(200)
  })

  test("PATCH /orders/:orderId/cancel", async () => {
    const response = await app.inject({
      method: "DELETE",
      headers: { authorization: `Bearer ${clientToken}` },
      url: `/orders/${order.id}/cancel`,
    })
    expect(response.statusCode).toBe(200)
    const cancelledOrder = JSON.parse(response.body)
    expect(cancelledOrder).toHaveProperty("id", order.id)
    expect(cancelledOrder).toHaveProperty("status", "CANCELLED")
  })
})
