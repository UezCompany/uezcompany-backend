import { prisma } from "../infra/connection/prisma"

interface IOrderRepository {
  getOrders(): Promise<any>
  getOrdersByUzer(idUzer: number | string): Promise<any>
  getCreatedOrdersByUser(idClient: number | string): Promise<any>
  getOrderById(id: number | string): Promise<any>
  getActiveOrders(): Promise<any>
}

class OrderRepository implements IOrderRepository {
  async getOrders() {
    return await prisma.order.findMany({
      include: {
        service: {
          include: {
            category: true,
          },
        },
      },
    })
  }

  async getOrdersByUzer(id: number | string) {
    return await prisma.order.findMany({
      where: {
        uzerId: String(id),
      },
      include: {
        service: {
          include: {
            category: true,
          },
        },
      },
    })
  }

  async getCreatedOrdersByUser(id: number | string) {
    return await prisma.order.findMany({
      where: {
        clientId: String(id),
      },
      include: {
        service: {
          include: {
            category: true,
          },
        },
      },
    })
  }

  async getOrderById(id: number | string) {
    return await prisma.order.findUnique({ where: { id: String(id) } })
  }

  async getActiveOrders() {
    return await prisma.order.findMany({
      where: {
        available: true,
      },
      include: {
        service: {
          include: {
            category: true,
          },
        },
      },
    })
  }
}

export const orderRepository = new OrderRepository()
