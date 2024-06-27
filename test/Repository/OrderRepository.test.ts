import { clientRepository } from "@/repository/ClientRepository"
import { orderRepository } from "@/repository/OrderRepository"
import { uzerRepository } from "@/repository/UzerRepository"
import { describe, expect, test } from "vitest"

describe("Order repository", () => {
  let TestOrderRepository: any
  let TestUzer: any
  let TestCliente: any

  test("lista todas as ordens", async () => {
    TestOrderRepository = await orderRepository.getOrders()
    TestUzer = (await uzerRepository.getUzers(1, 1))[0]
    TestCliente = (await clientRepository.getClients(1, 1))[0]

    TestOrderRepository.forEach((order: any) => {
      expect(order).toHaveProperty("id")
      expect(order).toHaveProperty("titulo")
    })
  })

  test("lista a ordem pelo uzer", async () => {
    const id = TestUzer.id
    const TestOrders = await orderRepository.getOrdersByUzer(id)

    TestOrders.forEach((order: any) => {
      expect(order).toHaveProperty("id")
      expect(order).toHaveProperty("titulo")
    })
  })

  test("lista a ordem pelo cliente", async () => {
    const id = TestCliente.id
    const TestOrders = await orderRepository.getOrdersByUzer(id)

    TestOrders.forEach((order: any) => {
      expect(order).toHaveProperty("id")
      expect(order).toHaveProperty("titulo")
    })
  })

  test("lista a ordem pelo id", async () => {
    TestOrderRepository = await orderRepository.getOrders()

    const order = await orderRepository.getOrdersById(TestOrderRepository[0].id)

    expect(order).toHaveProperty("id")
    expect(order).toHaveProperty("titulo")
  })

  test("lista a ordem pela disponibilidade", async () => {
    TestOrderRepository = await orderRepository.getActiveOrders()

    TestOrderRepository.forEach((order: any) => {
      expect(order).toHaveProperty("id")
      expect(order).toHaveProperty("titulo")
    })
  })
})
