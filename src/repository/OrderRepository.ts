import { Prisma } from "@prisma/client"
import { prisma } from "../infra/connection/prisma"

interface IOrderRepository {
  getOrders(filters: GetOrdersFilters): Promise<any>
  getOrdersByUezer(idUezer: number | string): Promise<any>
  getCreatedOrdersByUser(idClient: number | string): Promise<any>
  getOrderById(id: number | string): Promise<any>
  getActiveOrders(filters: GetOrdersFilters): Promise<any>
  updateOrder(id: number | string, data: Prisma.OrderUpdateInput): Promise<any>
}

interface GetOrdersFilters {
  search?: string
  orderBy?: "default" | "newest" | "older" | "rentable" | "norentable"
  minValue?: number
  maxValue?: number
  toMatch?: boolean
  profession?: string
  speciality?: string
}

class OrderRepository implements IOrderRepository {
  async getOrders(filters: GetOrdersFilters) {
    const {
      search,
      orderBy,
      minValue,
      maxValue,
      toMatch,
      profession,
      speciality,
    } = filters
    return await prisma.order.findMany({
      where: {
        AND: [
          search ? { title: { contains: search } } : {},
          minValue ? { value: { gte: minValue } } : {},
          maxValue ? { value: { lte: maxValue } } : {},
          toMatch ? { value: 0 } : {},
          profession
            ? { speciality: { profession: { name: profession } } }
            : {},
          speciality ? { speciality: { name: speciality } } : {},
        ],
      },
      orderBy:
        orderBy === "newest"
          ? { created_at: "desc" }
          : orderBy === "older"
            ? { created_at: "asc" }
            : orderBy === "rentable"
              ? { value: "desc" }
              : orderBy === "norentable"
                ? { value: "asc" }
                : {},
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
    return await prisma.order.findUnique({
      where: { id: String(id) },
      include: {
        client: true,
        speciality: {
          include: {
            profession: true,
          },
        },
        uezer: true,
      },
    })
  }

  async getActiveOrders(filters: GetOrdersFilters) {
    const {
      search,
      orderBy,
      minValue,
      maxValue,
      toMatch,
      profession,
      speciality,
    } = filters
    return await prisma.order.findMany({
      where: {
        AND: [
          search ? { title: { contains: search } } : {},
          minValue ? { value: { gte: minValue } } : {},
          maxValue ? { value: { lte: maxValue } } : {},
          toMatch ? { value: 0 } : {},
          profession
            ? { speciality: { profession: { name: profession } } }
            : {},
          speciality ? { speciality: { name: speciality } } : {},
        ],
        available: true,
      },
      orderBy:
        orderBy === "newest"
          ? { created_at: "desc" }
          : orderBy === "older"
            ? { created_at: "asc" }
            : orderBy === "rentable"
              ? { value: "desc" }
              : orderBy === "norentable"
                ? { value: "asc" }
                : {},
      include: {
        speciality: {
          include: {
            profession: true,
          },
        },
        client: true,
      },
    })
  }

  async updateOrder(id: number | string, data: Prisma.OrderUpdateInput) {
    return await prisma.order.update({
      where: { id: String(id) },
      data,
    })
  }

  async cancelOrder(id: string) {
    return await prisma.order.update({
      where: { id: String(id) },
      data: {
        status: "CANCELLED",
        available: false,
      },
    })
  }
}

export const orderRepository = new OrderRepository()
