import { prisma } from "@/lib/prisma"

export async function GetUserdataById(id: string) {
  const cliente = await prisma.clientes.findUnique({ where: { id } })

  if (!cliente) {
    const uzer = await prisma.uzers.findUnique({ where: { id } })
    if (!uzer) return null
    return uzer
  }
  return cliente
}
