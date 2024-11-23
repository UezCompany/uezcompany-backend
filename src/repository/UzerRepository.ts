import { prisma } from "../infra/connection/prisma"

interface IUzerRepository {
  getUzers(page: number, pageSize: number): Promise<any>
  getUzerByUsername(username: string): Promise<any>
  getUzerById(id: string): Promise<any>
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
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        status: true,
        block_reason: true,
        address: true,
        birth_date: true,
        created_at: true,
        phone: true,
        usertype: true,
        orders_amount: true,
        image: true,
        last_online: true,
        last_login: true,
        rating: true,
      },
    })
  }

  async getUzerByUsername(username: string) {
    return await prisma.user.findUnique({
      where: { username, OR: [{ usertype: "UZER" }, { usertype: "BOTH" }] },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        status: true,
        block_reason: true,
        address: true,
        birth_date: true,
        created_at: true,
        phone: true,
        usertype: true,
        orders_amount: true,
        image: true,
        last_online: true,
        last_login: true,
      },
    })
  }

  async getUzerById(id: string) {
    return await prisma.user.findUnique({
      where: { id, OR: [{ usertype: "UZER" }, { usertype: "BOTH" }] },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        status: true,
        block_reason: true,
        address: true,
        birth_date: true,
        created_at: true,
        phone: true,
        usertype: true,
        orders_amount: true,
        image: true,
        last_online: true,
        last_login: true,
      },
    })
  }
}

export const uzerRepository = new UzerRepository()
