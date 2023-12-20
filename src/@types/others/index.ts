export interface Endereco {
  logradouro: string | null
  numero: string | null
  complemento: string | null
  bairro: string | null
  cidade: string | null
  estado: string | null
}

export interface CustomError extends Error {
  stack?: string
  // Outros campos específicos, se necessário
}
