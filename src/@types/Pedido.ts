interface Pedido {
  tipo?: string
  _categoriaServico?: string
  _servico?: string
  titulo?: string
  descricao?: string
  status?: string
  disponivel?: boolean
  _id_uzer?: string
  _id_cliente?: string
  dataCriacao?: Date
  dataFinalizacao?: Date
  valor?: number
  images?: string[]
  avaliacao?: number
  avaliado?: boolean
}

export default Pedido
