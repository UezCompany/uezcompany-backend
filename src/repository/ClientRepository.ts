import { prisma } from "../infra/connection/prisma"

interface IClientRepository {
  getClients(page: number, pageSize: number): Promise<any>
  getClientByUsername(username: string): Promise<any>
  getClientById(id: string): Promise<any>
  updateClientByUsername(username: string, data:  updateDetails): Promise<any>
}

const optimizedDetails = {
  id: true,
  username: true,
  name: true,
  usertype: true,
  status: true,
  image: true,
  rating: true,
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
  rating: true,
  ratings: true,
  created_at: true,
}

interface updateDetails  {
  username: string,
  name: string,
  email: string,
  image: string,
  bio: string,
  phone: string,
  birth_date: string,
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
      select: optimizedDetails,
    })
  }

  async getClientByUsername(username: string) {
    return await prisma.user.findUnique({
      where: { username, OR: [{ usertype: "CLIENT" }, { usertype: "BOTH" }] },
      select: allDetails,
    })
  }

  async getClientById(id: string) {
    return await prisma.user.findUnique({
      where: { id, OR: [{ usertype: "CLIENT" }, { usertype: "BOTH" }] },
      select: allDetails,
    })
  }

  async updateClientByUsername(username: string, dataUpdate: Partial<updateDetails>): Promise<any> {
    return await prisma.user.update({
      where: { username },
      data: dataUpdate
    })
  }
  async updateClientById(id: string, dataUpdate: Partial<updateDetails>) {
    return await prisma.user.update({
      where: { id },
      data: dataUpdate
    })
  }
}

export const clientRepository = new ClientRepository()
