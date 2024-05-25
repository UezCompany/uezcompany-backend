import { orderRepository } from "@/repository/OrderRepository"
import { describe, expect, test } from "vitest"

describe('Order repository', () => {
     let TestOrderRepository: any
     let TestUzer: any
     let TestCliente: any

     test('lista todas as ordens', () => {
          TestOrderRepository = orderRepository.getOrders()

          TestOrderRepository.forEach((order) => {
               expect(order).toHaveProperty("id")
               expect(order).toHaveProperty("tipo")
               expect(order).toHaveProperty("Titulo")
          })

     })


     test('lista a ordem pelo uzer', () => {
          const id = TestUzer.id
          const order = orderRepository.getOrdersByUzer(id)

          expect(order).toHaveProperty("id")
          expect(order).toHaveProperty("tipo")
          expect(order).toHaveProperty("Titulo")
     })


     test('lista a ordem pelo cliente', () => {
          const id = TestCliente.id
          const order = orderRepository.getOrdersByUzer(id)

          expect(order).toHaveProperty("id")
          expect(order).toHaveProperty("tipo")
          expect(order).toHaveProperty("Titulo")
     })
     
     test('lista a ordem pelo id', () => {
          TestOrderRepository = orderRepository.getOrders()

          const order = orderRepository.getOrdersById(TestOrderRepository[0].id)

          expect(order).toHaveProperty("id")
          expect(order).toHaveProperty("tipo")
          expect(order).toHaveProperty("Titulo")
     })


     test('lista a ordem pela disponibilidade', () => {
          TestOrderRepository = orderRepository.getActiveOrders()

          TestOrderRepository.forEach((order) => {
               expect(order).toHaveProperty("id")
               expect(order).toHaveProperty("tipo")
               expect(order).toHaveProperty("Titulo")
          })
     })


})
