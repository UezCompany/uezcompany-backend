import { Document, Schema, Model, model } from "mongoose"
import IServico from "../@types/Servico"

const servicoSchema: Schema = new Schema<IServico & Document>(
  {
    nome: {
      type: String,
      required: true,
    },

    // @ts-expect-error FIXME: type error
    tipo: {
      type: Array,
      required: true,
      default: ["ONLINE"],
    },

    categoria: {
      type: String,
      required: true,
    },

    descricao: {
      type: String,
      default: "Serviço oferecido pela UezCompany",
    },

    quantidadeFeitos: {
      type: Number,
      default: 0,
    },

    taxaPadrao: {
      type: Number,
      default: 6,
    },
  },

  {
    versionKey: "__versionOfSchema__",
  },
)

const Servico: Model<IServico & Document> = model<IServico & Document>(
  "Servico",
  servicoSchema,
)

export default Servico
