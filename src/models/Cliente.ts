import { prisma } from "@/lib/prisma"

const ClienteModel = {
  getAllClientes: async () => {
    const clientes = await prisma.clientes.findMany()
    return clientes
  },
  getClienteById: async (id: string) => {
    const cliente = await prisma.clientes.findUnique({ where: { id } })
    return cliente
  },
  getClienteByEmail: async (email: string) => {
    const cliente = await prisma.clientes.findFirst({ where: { email } })
    return cliente
  },
  getClienteByCpf: async (cpf: string) => {
    const cliente = await prisma.clientes.findFirst({ where: { cpf } })
    return cliente
  },
  createCliente: async (cliente: any) => {
    const newCliente = await prisma.clientes.create({ data: cliente })
    return newCliente
  },
  updateCliente: async (id: string, updateData: any) => {
    const updateCliente = await prisma.clientes.update({
      where: { id },
      data: updateData,
    })
    return updateCliente
  },
  deleteCliente: async (id: string) => {
    const deleteCliente = await prisma.clientes.delete({ where: { id } })
    return deleteCliente
  },
}

export default ClienteModel
