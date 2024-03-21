import { prisma } from "@/lib/prisma"

const ServicoModel = {
  getAllServicos: async () => {
    // const servicos = await Servico.find({})
    const servicos = await prisma.servicos.findMany()
    return servicos
  },
  getServicoByName: async (nome: string) => {
    // const servico = await Servico.findOne({ nome: name }).catch((err) =>
    //   console.error(err),
    // )
    const servico = await prisma.servicos.findUnique({
      where: {
        nome,
      },
    })
    return servico
  },
  getServicoById: async (id: string) => {
    // const servico = await Servico.findById(id).catch((err) =>
    //   console.error(err),
    // )
    const servico = await prisma.servicos.findUnique({
      where: {
        id,
      },
    })
    return servico
  },
  getServicosByCategory: async (categoria: string) => {
    // const servico = await Servico.find({
    //   categoriaServico: {
    //     $regex: new RegExp("^" + lowercaseCategory + "$", "i"),
    //   },
    // }).catch((err) => console.error(err))
    const servicos = await prisma.servicos.findMany({
      where: {
        categoria,
      },
    })
    return servicos
  },
  getCategoryByServico: async (nome: string) => {
    // const category = await Servico.findOne({ nome: nomeServico }).catch((err) =>
    //   console.error(err),
    // )
    const category = await prisma.servicos.findUnique({
      where: {
        nome,
      },
    })
    return category?.categoria
  },
  createServico: async (servico: any) => {
    // const newServico = await Servico.create(servico)
    const newServico = await prisma.servicos.create({
      data: servico,
    })
    return newServico
  },
  deleteServico: async (id: string) => {
    // const deleteServico = Servico.deleteOne({ _id: id }).catch((err) =>
    //   console.error(err),
    // )
    const deleteServico = await prisma.servicos.delete({
      where: {
        id,
      },
    })
    return deleteServico
  },
}

export default ServicoModel
