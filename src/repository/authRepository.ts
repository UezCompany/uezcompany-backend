import { prisma } from "@/infra/connection/prisma"
import bcrypt from "bcrypt"

interface IAuthRepository {
  loginUser(id: string): Promise<any>
  completeRegister(data: Partial<registerBody>): Promise<any>
  forgotPassaword(email: string): Promise<any>
  register(data: Partial<registerBody>): Promise<any>
}

interface registerBody {
  userId: string
  name: string
  birth_date: string
  email: string
  password: string
  phone?: string
  username: string
  usertype: string
  image?: string
  specialityId?: string
}

class AuthRepository implements IAuthRepository {
  async register(data: Partial<registerBody>): Promise<any> {
    return await prisma.user.create({
      data: {
        birth_date: data.birth_date,
        email: data.email,
        name: data.name,
        username: data.username,
        usertype: data.usertype,
        password: data.password ? bcrypt.hashSync(data.password, 10) : null,
        phone: data.phone ?? null,
        image: data.image ?? undefined,
        speciality: data.specialityId
          ? { connect: { id: data.specialityId } }
          : undefined,
      },
    })
  }

  async forgotPassaword(email: string): Promise<any> {
    return null
  }

  async completeRegister(data: Partial<registerBody>): Promise<any> {
    return await prisma.user.update({
      where: {
        email: data.email,
        id: data.userId,
      },
      data: {
        birth_date: data.birth_date,
        name: data.name,
        username: data.username,
        usertype: data.usertype,
        password: data.password ? bcrypt.hashSync(data.password, 10) : null,
        phone: data.phone ? data.phone : null,
        image: data.image ? data.image : undefined,
        speciality: data.specialityId
          ? { connect: { id: data.specialityId } }
          : undefined,
        status: "ACTIVE",
      },
    })
  }
  async loginUser(id: string): Promise<any> {
    return await prisma.user.update({
      where: {
        id,
      },
      data: {
        last_login: new Date(),
      },
    })
  }
}

export const authRepository = new AuthRepository()
