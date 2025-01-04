import { prisma } from "../infra/connection/prisma"

interface IUserRepository {
  getUsers(page: number, pageSize: number): Promise<any>
  getUserByUsername(username: string): Promise<any>
  getUserById(id: string): Promise<any>
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

class UserRepository implements IUserRepository {
  async getUsers(page: number, pageSize: number) {
    const offset = (page <= 1 ? 0 : page - 1) * pageSize
    return await prisma.user.findMany({
      skip: offset,
      take: pageSize,
      select: optimizedDetails,
    })
  }

  async getUserByUsername(username: string) {
    return await prisma.user.findUnique({
      where: { username },
      select: allDetails,
    })
  }

  async getUserById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      select: allDetails,
    })
  }
}

export const userRepository = new UserRepository()
