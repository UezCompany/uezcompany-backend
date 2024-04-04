import { prisma } from "@/lib/prisma"

export function getClients() {
  return prisma.clientes.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      lastLogin: true,
      bairro: true,
      cep: true,
      cidade: true,
      complemento: true,
      estado: true,
      nome: true,
      telefone: true,
      tipoUsuario: true,
      dataCadastro: true,
      quantidadePedidos: true,
      dataNascimento: true,
      numero: true,
      situacao: true,
      motivoBloqueio: true,
      photoUrl: true,
      lastOnline: true,
      pedidos: true,
    },
    distinct: ["username"],
  })
}
