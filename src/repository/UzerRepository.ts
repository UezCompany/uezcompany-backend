import { Uzer } from "@/infra/lib/ZodSchemas/Response/UzerSchema"
import { prisma } from "../infra/connection/prisma"

interface IUzerRepository {
  getUzers(page: number, pageSize: number): Promise<any>
  getUzerByUsername(username: string): Promise<any>
  getUzerById(id: string): Promise<any>
}

class UzerRepository implements IUzerRepository {
  async getUzers(page: number, pageSize: number) {
    const offset = (page <= 1 ? 0 : page - 1) * pageSize
    return (await prisma.uzers.findMany({
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
        quantidadePedidosRealizados: true,
        avaliacao: true,
        lastOnline: true,
        lastLogin: true,
        bannerUrl: true,
        bio: true,
        servico: {
          select: {
            categoria: true,
            nome: true,
            id: true,
            quantidadeFeitos: true,
            tipo: true,
            taxaPadrao: true,
            descricao: true,
          },
        },
      },
    })) as Uzer[]
  }

  async getUzerByUsername(username: string) {
    return await prisma.uzers.findUnique({
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
        quantidadePedidosRealizados: true,
        avaliacao: true,
        lastOnline: true,
        lastLogin: true,
        bannerUrl: true,
        bio: true,
        servico: {
          select: {
            categoria: true,
            nome: true,
            id: true,
            quantidadeFeitos: true,
            tipo: true,
            taxaPadrao: true,
            descricao: true,
          },
        },
      },
    })
  }

  async getUzerById(id: string) {
    return await prisma.uzers.findUnique({
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
        quantidadePedidosRealizados: true,
        avaliacao: true,
        lastOnline: true,
        lastLogin: true,
        bannerUrl: true,
        bio: true,
        servico: {
          select: {
            categoria: true,
            nome: true,
            id: true,
            quantidadeFeitos: true,
            tipo: true,
            taxaPadrao: true,
            descricao: true,
          },
        },
      },
    })
  }
}

export const uzerRepository = new UzerRepository()
