import { prisma } from "@/infra/connection/prisma"

export async function GetUserdataById(id: string) {
  const user = await prisma.user.findUnique({ where: { id } })

  return user
}
