import { prisma } from "@/lib/prisma"

const NotificationModel = {
  getNotifications: async (receiverId: string) => {
    // const notifications: INotification[] = await Notification.find({
    //   _idUser: idUser,
    // })
    const notifications = await prisma.notificacoes.findMany({
      where: { receiverId },
    })
    return notifications
  },
  pushNotifications: async (
    receiverId: string,
    content: string,
    type: string,
  ) => {
    // const push = await Notification.create({
    //   type: type,
    //   content: content,
    //   _idUser: idUser,
    // })
    const push = await prisma.notificacoes.create({
      data: {
        receiverId,
        content,
        type,
      },
    })
    return push
  },
  markAsRead: async (idNotification: string) => {
    // const push = await Notification.updateOne(
    //   { _id: idNotification },
    //   { readed: true },
    // )
    const push = await prisma.notificacoes.update({
      where: { id: idNotification },
      data: { readed: true },
    })
    return push
  },
  deleteNotification: async (idNotification: string) => {
    // const deletedNotification = await Notification.deleteOne({
    //   _id: idNotification,
    // })
    const deletedNotification = await prisma.notificacoes.delete({
      where: { id: idNotification },
    })
    return deletedNotification
  },
}

export default NotificationModel
