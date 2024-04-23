import { prisma } from "../lib/prisma"

interface IClienteRepository {
  getClientes(page: number, pageSize: number): Promise<any>
  getClienteByUsername(username: string): Promise<any>
  getClienteById(id: string): Promise<any>
}

class ClienteRepository implements IClienteRepository {
  async getClientes(page: number, pageSize: number) {
    const offset = (page <= 1 ? 0 : page - 1) * pageSize
    return await prisma.clientes.findMany({
      skip: offset,
      take: pageSize,
    })
  }

  async getClienteByUsername(username: string) {
    return await prisma.clientes.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        nome: true,
        email: true,
        situacao: true,
        motivoBloqueio: true,
        cep: true,
        logradouro: true,
        numero: true,
        complemento: true,
        bairro: true,
        cidade: true,
        estado: true,
        dataNascimento: true,
        dataCadastro: true,
        telefone: true,
        tipoUsuario: true,
        quantidadePedidos: true,
        photoUrl: true,
        lastOnline: true,
        lastLogin: true,
        favoriteUzers: true,
      },
    })
  }

  async getClienteById(id: string) {
    return await prisma.clientes.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        nome: true,
        email: true,
        situacao: true,
        motivoBloqueio: true,
        cep: true,
        logradouro: true,
        numero: true,
        complemento: true,
        bairro: true,
        cidade: true,
        estado: true,
        dataNascimento: true,
        dataCadastro: true,
        telefone: true,
        tipoUsuario: true,
        quantidadePedidos: true,
        photoUrl: true,
        lastOnline: true,
        lastLogin: true,
        favoriteUzers: true,
      },
    })
  }
}

export const clienteRepository = new ClienteRepository()
