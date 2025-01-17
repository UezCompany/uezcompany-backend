import { clientRepository } from "@/repository/ClientRepository"
import { orderRepository } from "@/repository/OrderRepository"
import { uezerRepository } from "@/repository/UezerRepository"
import { describe, expect, test } from "vitest"

const fields = ["id", "title", "description", "status"]

describe("Order repository", () => {
  let TestOrderRepository: any
  let TestUezer: any
  let TestClient: any

  test("lista todas as ordens", async () => {
    TestOrderRepository = await orderRepository.getOrders()
    TestUezer = (await uezerRepository.getUezers(1, 1))[0]
    TestClient = (await clientRepository.getClients(1, 1))[0]

    TestOrderRepository.forEach((order: any) => {
      fields.forEach((field) => {
        expect(order).toHaveProperty(field)
      })
    })
  })

  test("lista o pedido pelo uezer", async () => {
    const id = TestUezer.id
    const TestOrders = await orderRepository.getOrdersByUezer(id)

    TestOrders.forEach((order: any) => {
      fields.forEach((field) => {
        expect(order).toHaveProperty(field)
      })
    })
  })

  test("List orders created by user", async () => {
    const id = TestClient.id
    const TestOrders = await orderRepository.getCreatedOrdersByUser(id)

    TestOrders.forEach((order: any) => {
      fields.forEach((field) => {
        expect(order).toHaveProperty(field)
      })
    })
  })

  test("lista o pedido pelo id", async () => {
    TestOrderRepository = await orderRepository.getOrders()

    const order = await orderRepository.getOrderById(TestOrderRepository[0].id)

    fields.forEach((field) => {
      expect(order).toHaveProperty(field)
    })
  })

  test("lista o pedido pela disponibilidade", async () => {
    TestOrderRepository = await orderRepository.getActiveOrders()

    TestOrderRepository.forEach((order: any) => {
      fields.forEach((field) => {
        expect(order).toHaveProperty(field)
      })
    })
  })

  test("atualiza o pedido", async () => {
    const orderId = TestOrderRepository[0].id
    const updateData = {
      title: "Novo pedido atualizado",
      description: "Esse é um teste de atualização de pedido",
      specialityId: TestOrderRepository[0].specialityId,
      value: 22222,
    }

    const updatedOrder = await orderRepository.updateOrder(orderId, updateData)

    expect(updatedOrder).toHaveProperty("id", orderId)
    expect(updatedOrder).toHaveProperty("title", updateData.title)
    expect(updatedOrder).toHaveProperty("description", updateData.description)
    expect(updatedOrder).toHaveProperty("specialityId", updateData.specialityId)
    expect(updatedOrder).toHaveProperty("value", updateData.value)
  })
})
