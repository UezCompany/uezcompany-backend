import { clientRepository } from "@/repository/ClientRepository"
import { orderRepository } from "@/repository/OrderRepository"
import { uzerRepository } from "@/repository/UzerRepository"
import { describe, expect, test } from "vitest"

const fields = ["id", "title", "description", "status"]

describe("Order repository", () => {
  let TestOrderRepository: any
  let TestUzer: any
  let TestClient: any

  test("lista todas as ordens", async () => {
    TestOrderRepository = await orderRepository.getOrders()
    TestUzer = (await uzerRepository.getUzers(1, 1))[0]
    TestClient = (await clientRepository.getClients(1, 1))[0]

    TestOrderRepository.forEach((order: any) => {
      fields.forEach((field) => {
        expect(order).toHaveProperty(field)
      })
    })
  })

  test("lista a ordem pelo uzer", async () => {
    const id = TestUzer.id
    const TestOrders = await orderRepository.getOrdersByUzer(id)

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
