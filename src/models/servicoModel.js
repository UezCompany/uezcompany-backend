const Servico = require('./Schemas/Servico')

const ServicoModel = {
    getAllServicos: async () => {
        const servicos = await Servico.find({})
        return servicos
    },
    getServicoByName: async (name) => {
        const servico = await Servico.findOne({ nome: name }).catch(err => console.error(err))
        return servico
    },
    getServicoByCategory: async (category) => {
        const lowercaseCategory = category.toLowerCase()
        const servico = await Servico.find({ categoriaServico: { $regex: new RegExp('^' + lowercaseCategory + '$', 'i') } }).catch(err => console.error(err))
        return servico
    },
    getCategoryByServico: async (servico) => {
        console.log("model", servico)
        const category = await Servico.find({ nome: servico }).catch(err => console.error(err))
        return category[0].categoria
    },
    createServico: async (servico) => {
        const newServico = await Servico.create(servico).catch(err => console.error(err))
        return newServico
    },
    deleteServico: async (id) => {
        const deleteServico = Servico.deleteOne({ _id: id }).catch(err => console.error(err))
        return deleteServico
    }
}

module.exports = ServicoModel