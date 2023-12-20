import { Endereco } from "./others"

interface ICliente {
  username: string | null
  nome: string
  email: string
  senha: string
  userType: string
  aprovacao: boolean
  reprovacao: boolean
  photoUrl: string
  chats: string[]
  CEP: string | null
  RG: string | null
  CPF: string
  dataNascimento: Date | string
  dataCadastro: Date
  telefone: string | null
  situacao: string
  motivoBloqueio: string | null
  quantidadePedidos: number
  avaliacao: number
  endereco: Endereco
}

export default ICliente
