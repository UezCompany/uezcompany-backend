const Uzer = require('./Schemas/Uzer')

const UzerModel = {
  getAllUzers: async () => {
    console.log('Consultando coleção:', Uzer.collection.collectionName);
    const uzers = await Uzer.find({});
    console.log('Uzers encontrados:', uzers);
    return uzers;
  },
  getUzerById: async (id) => {
    const uzer = await Uzer.findById(id).catch(err => console.error(err));
    return uzer
  },
  getUzerByEmail: async (email) => {
    const uzer = await Uzer.findOne({ emailUzer: email });
    return uzer
  },
  createUzer: async (uzer) => {
    const newUzer = await Uzer.create(uzer).catch(err => console.error(err));
    return newUzer
  },
  updateUzer: async (id, { emailUzer, cpfUzer, rgUzer, senhaUzer }) => {
    const updateUzer = await Uzer.updateOne({ _id: id }, { emailUzer, cpfUzer, rgUzer, senhaUzer }).catch(err => console.error(err));
    return updateUzer
  },
  deleteUzer: async (id) => {
    const deleteUzer = Uzer.deleteOne({ _id: id }).catch(err => console.error(err));
    return deleteUzer
  },
  // Outras funções para o modelo de Uzer
};

module.exports = UzerModel;
