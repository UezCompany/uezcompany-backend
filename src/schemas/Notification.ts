import { Document, Schema, Model, model } from "mongoose"
import INotification from "@/@types/Notification"

const notificationsSchema = new Schema<INotification & Document>(
  {
    type: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    meta: {
      type: Date,
      default: Date.now(),
    },

    _idUser: {
      type: String,
      required: true,
    },

    readed: {
      type: Boolean,
      default: false,
    },
  },

  {
    versionKey: "__versionOfSchema__",
  },

)

const Notifications: Model<INotification & Document> = model<
  INotification & Document
>("Notifications", notificationsSchema)

export default Notifications
