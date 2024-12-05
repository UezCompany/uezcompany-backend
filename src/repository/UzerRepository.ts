import { prisma } from "../infra/connection/prisma"

interface IUzerRepository {
  getUzers(page: number, pageSize: number): Promise<any>
  getUzerByUsername(username: string): Promise<any>
  getUzerById(id: string): Promise<any>
}

const optimizedDetails = {
  id: true,
  username: true,
  name: true,
  usertype: true,
  status: true,
  image: true,
  orders_amount: true,
  completed_orders_amount: true,
  rating: true,
  service: {
    select: {
      id: true,
      name: true,
    },
  },
}

const allDetails = {
  id: true,
  username: true,
  name: true,
  email: true,
  usertype: true,
  status: true,
  block_reason: true,
  image: true,
  banner: true,
  bio: true,
  phone: true,
  birth_date: true,
  last_online: true,
  last_login: true,
  orders_amount: true,
  completed_orders_amount: true,
  rating: true,
  ratings: true,
  created_at: true,
  service: {
    select: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      name: true,
      type: true,
      description: true,
      default_tax: true,
      id: true,
      completed_orders_amount: true,
    },
  },
}

class UzerRepository implements IUzerRepository {
  async getUzers(page: number, pageSize: number) {
    const offset = (page <= 1 ? 0 : page - 1) * pageSize
    return await prisma.user.findMany({
      skip: offset,
      take: pageSize,
      where: {
        OR: [{ usertype: "UZER" }, { usertype: "BOTH" }],
      },
      select: optimizedDetails,
    })
  }

  async getUzerByUsername(username: string) {
    return await prisma.user.findUnique({
      where: { username, OR: [{ usertype: "UZER" }, { usertype: "BOTH" }] },
      select: allDetails,
    })
  }

  async getUzerById(id: string) {
    return await prisma.user.findUnique({
      where: { id, OR: [{ usertype: "UZER" }, { usertype: "BOTH" }] },
      select: allDetails,
    })
  }
}

export const uzerRepository = new UzerRepository()
