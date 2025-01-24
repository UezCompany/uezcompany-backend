import { Prisma } from "@prisma/client"
import { prisma } from "../infra/connection/prisma"

interface IOrderRepository {
  getOrders(filters?: GetOrdersFilters): Promise<any>
  getOrdersByUezer(idUezer: number | string): Promise<any>
  getCreatedOrdersByUser(idClient: number | string): Promise<any>
  getOrderById(id: number | string): Promise<any>
  getActiveOrders(filters?: GetOrdersFilters): Promise<any>
  getConcludedOrders(filters?: GetOrdersFilters): Promise<any>
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
  async getOrders(filters?: GetOrdersFilters) {
    return filters
      ? await prisma.order.findMany({
          where: {
            AND: [
              filters.search ? { title: { contains: filters.search } } : {},
              filters.minValue ? { value: { gte: filters.minValue } } : {},
              filters.maxValue ? { value: { lte: filters.maxValue } } : {},
              filters.toMatch ? { value: 0 } : {},
              filters.profession
                ? { speciality: { profession: { name: filters.profession } } }
                : {},
              filters.speciality
                ? { speciality: { name: filters.speciality } }
                : {},
            ],
          },
          orderBy:
            filters.orderBy === "newest"
              ? { created_at: "desc" }
              : filters.orderBy === "older"
                ? { created_at: "asc" }
                : filters.orderBy === "rentable"
                  ? { value: "desc" }
                  : filters.orderBy === "norentable"
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
      : await prisma.order.findMany({})
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

  async getActiveOrders(filters?: GetOrdersFilters) {
    return filters
      ? await prisma.order.findMany({
          where: {
            AND: [
              filters.search ? { title: { contains: filters.search } } : {},
              filters.minValue ? { value: { gte: filters.minValue } } : {},
              filters.maxValue ? { value: { lte: filters.maxValue } } : {},
              filters.toMatch ? { value: 0 } : {},
              filters.profession
                ? { speciality: { profession: { name: filters.profession } } }
                : {},
              filters.speciality
                ? { speciality: { name: filters.speciality } }
                : {},
            ],
            available: true,
          },
          orderBy:
            filters.orderBy === "newest"
              ? { created_at: "desc" }
              : filters.orderBy === "older"
                ? { created_at: "asc" }
                : filters.orderBy === "rentable"
                  ? { value: "desc" }
                  : filters.orderBy === "norentable"
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
      : await prisma.order.findMany({ where: { available: true } })
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

  async getConcludedOrders(filters?: GetOrdersFilters): Promise<any> {
    return filters
      ? await prisma.order.findMany({
          where: {
            AND: [
              filters.search ? { title: { contains: filters.search } } : {},
              filters.minValue ? { value: { gte: filters.minValue } } : {},
              filters.maxValue ? { value: { lte: filters.maxValue } } : {},
              filters.toMatch ? { value: 0 } : {},
              filters.profession
                ? { speciality: { profession: { name: filters.profession } } }
                : {},
              filters.speciality
                ? { speciality: { name: filters.speciality } }
                : {},
            ],
            status: "COMPLETED",
          },
          orderBy:
            filters.orderBy === "newest"
              ? { created_at: "desc" }
              : filters.orderBy === "older"
                ? { created_at: "asc" }
                : filters.orderBy === "rentable"
                  ? { value: "desc" }
                  : filters.orderBy === "norentable"
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
      : await prisma.order.findMany({ where: { status: "COMPLETED" } })
  }
}

export const orderRepository = new OrderRepository()
