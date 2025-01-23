import { prisma } from "@/infra/connection/prisma"

interface INotificationRepository {
  readNotification(id: string): Promise<any>
  readAllNotificacoes(id: string): Promise<any>
  getUserNotifications(id: string): Promise<any>
}

class NotificationRepository implements INotificationRepository {
  async getUserNotifications(id: string): Promise<any> {
    return await prisma.notification.findMany({
      where: {
        receiverId: id,
      },
      orderBy: {
        created_at: "desc",
      },
    })
  }

  async readAllNotificacoes(id: string): Promise<any> {
    return await prisma.notification.updateMany({
      where: {
        receiverId: id,
      },
      data: {
        readed: true,
      },
    })
  }

  async readNotification(id: string): Promise<any> {
    return await prisma.notification.update({
      where: {
        id,
      },
      data: {
        readed: true,
      },
    })
  }
}

export const notificationRepository = new NotificationRepository()
