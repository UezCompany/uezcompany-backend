import { prisma } from "@/lib/prisma"

const UzerModel = {
  getAllUzers: async () => {
    const uzers = await prisma.uzers.findMany()
    return uzers
  },
  getUzerById: async (id: string) => {
    const uzer = await prisma.uzers.findUnique({ where: { id } })
    return uzer
  },
  getUzerByEmail: async (email: string) => {
    const uzer = await prisma.uzers.findFirst({ where: { email } })
    return uzer
  },
  getUzerByCpf: async (cpf: string) => {
    const uzer = await prisma.uzers.findFirst({ where: { cpf } })
    return uzer
  },
  createUzer: async (uzer: any) => {
    const newUzer = await prisma.uzers.create({ data: uzer })
    return newUzer
  },
  updateUzer: async (id: string, updateData: any) => {
    const updateUzer = await prisma.uzers.update({
      where: { id },
      data: updateData,
    })
    return updateUzer
  },
  deleteUzer: async (id: string) => {
    const deleteUzer = await prisma.uzers.delete({ where: { id } })
    return deleteUzer
  },
  avaliarUzer: async (idUzer: string, avaliacao: number) => {
    const prevUzerData = await prisma.uzers.findUnique({
      where: { id: idUzer },
    })
    if (!prevUzerData) {
      return
    }
    await prisma.uzers.update({
      where: { id: idUzer },
      data: { avaliacoes: { push: avaliacao } },
    })
    const newAvaliacao =
      prevUzerData.avaliacoes.length === 0
        ? avaliacao
        : (prevUzerData.avaliacoes.reduce(
            (acc, curr) => Number(acc) + Number(curr),
            0,
          ) +
            Number(avaliacao)) /
          (prevUzerData.avaliacoes.length + 1)
    const uzer = await prisma.uzers.update({
      where: { id: idUzer },
      data: { avaliacao: newAvaliacao },
    })
    return uzer
  },
}

export default UzerModel
