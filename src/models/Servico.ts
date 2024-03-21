import Servico from "../schemas/Servico"
import IServico from "../@types/Servico"

const ServicoModel = {
  getAllServicos: async () => {
    const servicos = await Servico.find({})
    return servicos
  },

  getServicoByName: async (name: string) => {
    const servico = await Servico.findOne({ nome: name }).catch((err) =>
      console.error(err),
    )
    return servico
  },

  getServicoById: async (id: string) => {
    const servico = await Servico.findById(id).catch((err) =>
      console.error(err),
    )
    return servico
  },

  getServicoByCategory: async (category: string) => {
    const lowercaseCategory = category.toLowerCase()
    const servico = await Servico.find({
      categoriaServico: {
        $regex: new RegExp("^" + lowercaseCategory + "$", "i"),
      },
    }).catch((err) => console.error(err))
    return servico
  },

  getCategoryByServico: async (nomeServico: string) => {
    const category = await Servico.findOne({ nome: nomeServico }).catch((err) =>
      console.error(err),
    )
    return category?.categoria
  },

  createServico: async (servico: IServico) => {
    const newServico = await Servico.create(servico)
    return newServico
  },
  
  deleteServico: async (id: string) => {
    const deleteServico = Servico.deleteOne({ _id: id }).catch((err) =>
      console.error(err),
    )
    return deleteServico
  },
}

export default ServicoModel
