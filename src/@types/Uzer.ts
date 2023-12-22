import { Endereco } from "./others"

interface Servico {
  idServico: string | null
  nomeServico: string | null
  tipoServico: "ONLINE" | "PRESENCIAL" | "AMBOS" | null
  categoriaServico: string | null
  areaAtuacao: number | null
}

interface Chat {
  _idChat: string
}

interface IUzer {
  nome: string
  username: string | null
  email: string
  CPF: string
  RG: string | null
  senha: string
  situacao: string
  motivoBloqueio: string | null
  CEP: string | null
  endereco: Endereco
  historicoCriminal: string | null
  dataNascimento: Date | string
  dataCadastro: Date
  numeroTelefone: string | null
  avaliacao: number
  avaliacoes: number[]
  aprovacao: boolean
  reprovacao: boolean
  quantidadePedidosRealizados: number
  servicosPrestados: Servico[]
  userType: string
  photoUrl: string
  chats: Chat[]
}

export default IUzer
