import { Uzers } from "@prisma/client"
import { z } from "zod"

// @ts-expect-error ts(2322): Type 'Uzers' is not assignable to type 'Uzer'.
export const uzerSchema = z.object<Uzers>({
  id: z.coerce.string(),
  username: z.coerce.string(),
  nome: z.coerce.string(),
  email: z.coerce.string(),
  situacao: z.coerce.string(),
  motivoBloqueio: z.coerce.string().nullable(),
  cep: z.coerce.string(),
  logradouro: z.coerce.string(),
  numero: z.coerce.string(),
  complemento: z.coerce.string(),
  bairro: z.coerce.string(),
  cidade: z.coerce.string(),
  estado: z.coerce.string(),
  dataNascimento: z.coerce.string(),
  dataCadastro: z.coerce.string(),
  telefone: z.coerce.string(),
  tipoUsuario: z.coerce.string(),
  quantidadePedidos: z.coerce.string(),
  photoUrl: z.coerce.string().url(),
  quantidadePedidosRealizados: z.coerce.string(),
  avaliacao: z.coerce.number(),
  lastOnline: z.coerce.date(),
  lastLogin: z.coerce.date(),
  bannerUrl: z.coerce.string().url(),
  bio: z.coerce.string(),
  servico: z.object({
    categoria: z.object({
      id: z.coerce.string(),
      nome: z.coerce.string(),
    }),
    nome: z.coerce.string(),
    id: z.coerce.string(),
    quantidadeFeitos: z.coerce.number(),
    tipo: z.coerce.string(),
    taxaPadrao: z.coerce.number(),
    descricao: z.coerce.string(),
  }),
})

export type Uzer = z.infer<typeof uzerSchema>
