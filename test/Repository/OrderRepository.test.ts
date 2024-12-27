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

  test("lista a ordem pelo uezer", async () => {
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

  test("lista a ordem pelo id", async () => {
    TestOrderRepository = await orderRepository.getOrders()

    const order = await orderRepository.getOrderById(TestOrderRepository[0].id)

    fields.forEach((field) => {
      expect(order).toHaveProperty(field)
    })
  })

  test("lista a ordem pela disponibilidade", async () => {
    TestOrderRepository = await orderRepository.getActiveOrders()

    TestOrderRepository.forEach((order: any) => {
      fields.forEach((field) => {
        expect(order).toHaveProperty(field)
      })
    })
  })
})
