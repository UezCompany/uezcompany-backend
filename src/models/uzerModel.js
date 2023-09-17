const Uzer = require('./Schemas/Uzer')

const UzerModel = {
  getAllUzers: async () => {
    const uzers = await Uzer.find({});
    return uzers;
  },
  getUzerById: async (id) => {
    const uzer = await Uzer.findById(id).catch(err => console.error(err));
    return uzer
  },
  getUzerByEmail: async (email) => {
    const uzer = await Uzer.findOne({ email: email }).catch(err => console.error(err));
    return uzer
  },
  getUzerByCpf: async (cpf) => {
    const uzer = await Uzer.findOne({ CPF: cpf }).catch(err => console.error(err));
    return uzer
  },
  createUzer: async (uzer) => {
    const newUzer = await Uzer.create(uzer).catch(err => console.error(err));
    return newUzer
  },
  updateUzer: async (id, updateData) => {
    const updateUzer = await Uzer.updateOne({ _id: id }, updateData).catch(err => console.error(err));
    return updateUzer;
  },
  deleteUzer: async (id) => {
    const deleteUzer = Uzer.deleteOne({ _id: id }).catch(err => console.error(err));
    return deleteUzer
  },
  // Outras funções para o modelo de Uzer
};

module.exports = UzerModel;
