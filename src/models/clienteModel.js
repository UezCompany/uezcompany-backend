const Cliente = require('./Schemas/Cliente')

const ClienteModel = {
  getAllClientes: async () => {
    console.log('Consultando coleção:', Cliente.collection.collectionName);
    const clientes = await Cliente.find({});
    console.log('Clientes encontrados:', clientes);
    return clientes;
  },
  getClienteById: async (id) => {
    const cliente = await Cliente.findById(id).catch(err => console.error(err));
    return cliente
  },
  getClienteByEmail: async (email) => {
    const cliente = await Cliente.findOne({ emailCliente: email });
    return cliente
  },
  createCliente: async (cliente) => {
    const newCliente = await Cliente.create(cliente).catch(err => err);
    return newCliente
  },
 updateCliente: async (id, updateData) => {
    const updateCliente = await Cliente.updateOne({ _id: id }, updateData).catch(err => console.error(err));
    return updateCliente;
  },
  deleteCliente: async (id) => {
    const deleteCliente = Cliente.deleteOne({ _id: id }).catch(err => console.error(err));
    return deleteCliente
  },

  // Outras funções para o modelo de Cliente
};

module.exports = ClienteModel;
