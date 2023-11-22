const Uzer = require('./Schemas/Uzer')

const UzerModel = {
  getAllUzers: async () => {
    const uzers = await Uzer.find({}, '-CPF -RG -senha')
    return uzers
  },
  getUzerById: async (id) => {
    const uzer = await Uzer.findById(id, '-CPF -RG -senha').catch(err => console.error(err))
    return uzer
  },
  getUzerByEmail: async (email) => {
    const uzer = await Uzer.findOne({ email: email }).catch(err => console.error(err))
    return uzer
  },
  getUzerByCpf: async (cpf) => {
    const uzer = await Uzer.findOne({ CPF: cpf }).catch(err => console.error(err))
    return uzer
  },
  createUzer: async (uzer) => {
    const newUzer = await Uzer.create(uzer).catch(err => console.error(err))
    return newUzer
  },
  updateUzer: async (id, updateData) => {
    const updateUzer = await Uzer.updateOne({ _id: id }, updateData).catch(err => console.error(err))
    return updateUzer
  },
  deleteUzer: async (id) => {
    const deleteUzer = Uzer.deleteOne({ _id: id }).catch(err => console.error(err))
    return deleteUzer
  },
  avaliarUzer: async (idUzer, avaliacao) => {
    const prevUzerData = await Uzer.findOne({ _id: idUzer })
    await Uzer.updateOne({ _id: idUzer }, { avaliado: true, $push: { avaliacoes: avaliacao } }).catch(err => console.error(err))
    const newAvaliacao = 
    prevUzerData.avaliacoes.length === 0 ? avaliacao 
    : (prevUzerData.avaliacoes.reduce((acc, curr) => Number(acc) + Number(curr), 0) + Number(avaliacao)) / (prevUzerData.avaliacoes.length + 1)
    const uzer = await Uzer.updateOne({ _id: idUzer }, { avaliado: true, avaliacao: newAvaliacao }).catch(err => console.error(err))
    return uzer
  }     
  // Outras funções para o modelo de Uzer
}

module.exports = UzerModel
