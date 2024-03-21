import Notification from "../schemas/Notification"
import INotification from "../@types/Notification"

const NotificationModel = {
  getNotifications: async (idUser: string) => {
    const notifications: INotification[] = await Notification.find({
      _idUser: idUser,
    })
    return notifications
  },

  pushNotifications: async (idUser: string, content: string, type: string) => {
    const push = await Notification.create({
      type: type,
      content: content,
      _idUser: idUser,
    })
    return push
  },

  markAsRead: async (idNotification: string) => {
    const push = await Notification.updateOne(
      { _id: idNotification },
      { readed: true },
    )
    return push
  },
  
  deleteNotification: async (idNotification: string) => {
    const deletedNotification = await Notification.deleteOne({
      _id: idNotification,
    })
    return deletedNotification
  },
}

export default NotificationModel
