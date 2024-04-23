import { prisma } from "@/infra/connection/prisma"

export async function GetUsertypeById(id: string) {
  const cliente = await prisma.clientes.findUnique({ where: { id } })

  if (!cliente) {
    const uzer = await prisma.uzers.findUnique({ where: { id } })
    if (!uzer) return null
    return "UZER"
  }
  return "CLIENTE"
}
