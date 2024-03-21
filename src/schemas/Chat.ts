import { Document, Schema, Model, model } from "mongoose"
import IChat from "@/@types/Chat"

const chatSchema = new Schema<IChat & Document>(
  {
    uzerId: {
      type: String,
      required: true,
    },

    uzerService: {
      type: String,
      required: true,
    },

    clienteId: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    messages: [
      {
        _id: {
          type: String,
        },

        sendDate: {
          type: String,
        },

        sendHour: {
          type: String,
        },

        senderId: {
          type: String,
        },

        content: {
          type: String,
        },

        type: {
          type: String,
          default: "text",
        },

        _idPedido: {
          type: String,
          default: null,
        },
      },
    ],
    photo: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },

    clienteName: {
      type: String,
      default: "null",
    },

    uzerName: {
      type: String,
      default: "null",
    },

  },

  {
    versionKey: "__versionOfSchema__",
  },

)

const Chat: Model<IChat & Document> = model<IChat & Document>(
  "Chat",
  chatSchema,
)

export default Chat
