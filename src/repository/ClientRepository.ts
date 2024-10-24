import { prisma } from "../infra/connection/prisma"

interface IClientRepository {
  getClients(page: number, pageSize: number): Promise<any>
  getClientByUsername(username: string): Promise<any>
  getClientById(id: string): Promise<any>
}

class ClientRepository implements IClientRepository {
  async getClients(page: number, pageSize: number) {
    const offset = (page <= 1 ? 0 : page - 1) * pageSize
    return await prisma.user.findMany({
      skip: offset,
      take: pageSize,
      where: {
        OR: [{ usertype: "CLIENT" }, { usertype: "BOTH" }],
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
      },
    })
  }

  async getClientByUsername(username: string) {
    return await prisma.user.findUnique({
      where: { username, OR: [{ usertype: "CLIENT" }, { usertype: "BOTH" }] },
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

  async getClientById(id: string) {
    return await prisma.user.findUnique({
      where: { id, OR: [{ usertype: "CLIENT" }, { usertype: "BOTH" }] },
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

export const clientRepository = new ClientRepository()
