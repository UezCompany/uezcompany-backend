const Cliente = require('./Schemas/Cliente')

const ClienteModel = {
  getAllClientes: async () => {
    const clientes = await Cliente.find({}, '-CPF -RG -senha');
    return clientes;
  },
  getClienteById: async (id) => {
    const cliente = await Cliente.findById(id, '-CPF -RG -senha').catch(err => console.error(err));
    return cliente
  },
  getClienteByEmail: async (email) => {
    const cliente = await Cliente.findOne({ email: email }, 'email senha');
    return cliente
  },
  getClienteByCpf: async (cpf) => {
    const cliente = await Cliente.findOne({ CPF: cpf }, 'CPF');
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
