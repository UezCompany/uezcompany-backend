import { prisma } from "../infra/connection/prisma"

interface IUezerRepository {
  getUezers(page: number, pageSize: number): Promise<any>
  getUezerByUsername(username: string): Promise<any>
  getUezerById(id: string): Promise<any>
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
  speciality: {
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
  speciality: {
    select: {
      profession: {
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

interface updateDetails {
  username: string
  name: string
  email: string
  image: string
  bio: string
  phone: string
  birth_date: string
}

class UezerRepository implements IUezerRepository {
  async getUezers(page: number, pageSize: number) {
    const offset = (page <= 1 ? 0 : page - 1) * pageSize
    return await prisma.user.findMany({
      skip: offset,
      take: pageSize,
      where: {
        OR: [{ usertype: "UEZER" }, { usertype: "BOTH" }],
      },
      select: optimizedDetails,
    })
  }

  async getUezerByUsername(username: string) {
    return await prisma.user.findUnique({
      where: { username, OR: [{ usertype: "UEZER" }, { usertype: "BOTH" }] },
      select: allDetails,
    })
  }

  async getUezerById(id: string) {
    return await prisma.user.findUnique({
      where: { id, OR: [{ usertype: "UEZER" }, { usertype: "BOTH" }] },
      select: allDetails,
    })
  }

  async updateUezerByUsername(
    username: string,
    dataUpdate: Partial<updateDetails>,
  ): Promise<any> {
    return await prisma.user.update({
      where: { username },
      data: dataUpdate,
    })
  }
  async updateUezerById(id: string, dataUpdate: Partial<updateDetails>) {
    return await prisma.user.update({
      where: { id },
      data: dataUpdate,
    })
  }
}

export const uezerRepository = new UezerRepository()
