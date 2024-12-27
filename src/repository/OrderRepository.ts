import { prisma } from "../infra/connection/prisma"

interface IOrderRepository {
  getOrders(): Promise<any>
  getOrdersByUezer(idUezer: number | string): Promise<any>
  getCreatedOrdersByUser(idClient: number | string): Promise<any>
  getOrderById(id: number | string): Promise<any>
  getActiveOrders(): Promise<any>
}

class OrderRepository implements IOrderRepository {
  async getOrders() {
    return await prisma.order.findMany({
      include: {
        speciality: {
          include: {
            profession: true,
          },
        },
      },
    })
  }

  async getOrdersByUezer(id: number | string) {
    return await prisma.order.findMany({
      where: {
        uezerId: String(id),
      },
      include: {
        speciality: {
          include: {
            profession: true,
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
        speciality: {
          include: {
            profession: true,
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
        speciality: {
          include: {
            profession: true,
          },
        },
      },
    })
  }
}

export const orderRepository = new OrderRepository()
