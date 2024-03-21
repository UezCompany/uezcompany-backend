import { Document, Schema, Model, model } from "mongoose"
import IUzer from "../@types/Uzer"

const uzerSchema: Schema = new Schema<IUzer & Document>(
  {
    nome: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      default: null,
    },

    email: {
      type: String,
      required: true,
    },

    CPF: {
      type: String,
      required: true,
    },

    RG: {
      type: String,
      default: null,
    },

    senha: {
      type: String,
      required: true,
    },

    situacao: {
      type: String,
      default: "Ativo",
    },

    motivoBloqueio: {
      type: String,
      default: null,
    },

    CEP: {
      type: String,
      default: null,
    },

    endereco: {
      type: Object,
      default: {
        logradouro: null,
        numero: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null,
      },
    },

    historicoCriminal: {
      type: String,
      default: null,
    },

    dataNascimento: {
      type: Date,
      default: "",
    },

    dataCadastro: {
      type: Date,
      default: new Date(),
    },

    numeroTelefone: {
      type: String,
      default: null,
    },

    avaliacao: {
      type: Number,
      default: 0,
    },

    // @ts-expect-error FIXME: type error
    avaliacoes: {
      type: Array,
      default: [],
    },

    aprovacao: {
      type: Boolean,
      default: false,
    },

    reprovacao: {
      type: Boolean,
      default: false,
    },

    quantidadePedidosRealizados: {
      type: Number,
      default: 0,
    },

    // @ts-expect-error FIXME: type error
    servicosPrestados: {
      type: Array,
      default: [
        {
          idServico: null,
          nomeServico: null,
          tipoServico: null,
          categoriaServico: null,
          areaAtuacao: null,
        },
      ],
    },

    userType: {
      type: String,
      default: "uzer",
    },

    photoUrl: {
      type: String,
      default:
        "https://i.pinimg.com/280x280_RS/53/66/5d/53665d574976a6b66d283d7e3323bab9.jpg",
    },

    chats: [
      {
        _idChat: {
          type: String,
          required: true,
        },
      },
    ],
  },
  
  {
    versionKey: "__versionOfSchema__",
  },
)

const Uzer: Model<IUzer & Document> = model<IUzer & Document>(
  "Uzer",
  uzerSchema,
)

export default Uzer
