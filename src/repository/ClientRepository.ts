import { prisma } from "../infra/connection/prisma"

interface IClientRepository {
  getClients(page: number, pageSize: number): Promise<any>
  getClientByUsername(username: string): Promise<any>
  getClientById(id: string): Promise<any>
}

class ClientRepository implements IClientRepository {
  async getClients(page: number, pageSize: number) {
    const offset = (page <= 1 ? 0 : page - 1) * pageSize
    return await prisma.clientes.findMany({
      skip: offset,
      take: pageSize,
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

  async getClientByUsername(username: string) {
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

  async getClientById(id: string) {
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

export const clientRepository = new ClientRepository()
