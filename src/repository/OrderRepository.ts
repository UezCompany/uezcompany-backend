import { prisma } from "../infra/connection/prisma"

interface IOrderRepository {
  getOrders(): Promise<any>
  getOrdersByUzer(idUzer: number | string): Promise<any>
  getOrdersByClient(idClient: number | string): Promise<any>
  getOrdersById(id: number | string): Promise<any>
  getActiveOrders(): Promise<any>
}

class OrderRepository implements IOrderRepository {
  async getOrders() {
    return await prisma.pedidos.findMany()
  }

  async getOrdersByUzer(id: number | string) {
    return await prisma.pedidos.findMany({
      where: {
        idUzer: String(id),
      },
    })
  }

  async getOrdersByClient(id: number | string) {
    return await prisma.pedidos.findMany({
      where: {
        idCliente: String(id),
      },
    })
  }

  async getOrdersById(id: number | string) {
    return await prisma.pedidos.findUnique({ where: { id: String(id) } })
  }

  async getActiveOrders() {
    return await prisma.pedidos.findMany({
      where: {
        disponivel: true,
      },
    })
  }
}

export const orderRepository = new OrderRepository()
