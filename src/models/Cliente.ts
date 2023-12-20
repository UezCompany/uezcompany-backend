import Cliente from "../schemas/Cliente"
import ICliente from "../@types/Cliente"

const ClienteModel = {
  getAllClientes: async () => {
    const clientes = await Cliente.find({}, "-CPF -RG -senha")
    return clientes
  },
  getClienteById: async (id: string) => {
    const cliente = await Cliente.findById(id, "-CPF -RG -senha").catch((err) =>
      console.error(err),
    )
    return cliente
  },
  getClienteByEmail: async (email: string) => {
    const cliente = await Cliente.findOne({ email: email }, "email senha")
    return cliente
  },
  getClienteByCpf: async (cpf: string) => {
    const cliente = await Cliente.findOne({ CPF: cpf }, "CPF")
    return cliente
  },
  createCliente: async (cliente: ICliente) => {
    const newCliente = await Cliente.create(cliente).catch((err) => err)
    return newCliente
  },
  updateCliente: async (id: string, updateData: ICliente) => {
    const updateCliente = await Cliente.updateOne(
      { _id: id },
      updateData,
    ).catch((err) => console.error(err))
    return updateCliente
  },
  deleteCliente: async (id: string) => {
    const deleteCliente = Cliente.deleteOne({ _id: id }).catch((err) =>
      console.error(err),
    )
    return deleteCliente
  },
}

export default ClienteModel
