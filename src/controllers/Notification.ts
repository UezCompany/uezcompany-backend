import NotificationModel from "@/models/Notification"
import { Request, Response } from "express"

const NotificationController = {
  getAllNotifications: async (req: Request, res: Response) => {
    const { userId } = req.body
    try {
      const notifications = await NotificationModel.getNotifications(userId)
      res.status(200).json(notifications)
    } catch (error: any) {
      console.error("Erro ao obter as notificações: " + error.stack)
      res.status(500).json({ message: "Erro ao obter as notificações" })
    }
  },

  sendNotification: async (req: Request, res: Response) => {
    const { id } = req.params
    const { content, type } = req.body
    try {
      const notifications = await NotificationModel.pushNotifications(
        id,
        content,
        type,
      )
      res.status(200).json(notifications)
    } catch (error: any) {
      console.error("Erro ao enviar a notificação: " + error.stack)
      res.status(500).json({ message: "Erro ao enviar a notificação" })
    }
  },
  
  markAsRead: async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const notifications = await NotificationModel.markAsRead(id)
      if (
        notifications.modifiedCount === null ||
        notifications.modifiedCount === 0
      ) {
        return res.status(500).json({ message: "Nenhuma notificação foi lida" })
      }
      return res
        .status(200)
        .json({ notifications, message: "Notificação Lida" })
    } catch (error: any) {
      console.error("Erro ao obter as notificações: " + error.stack)
      res.status(500).json({ message: "Erro ao obter as notificações" })
    }
  },
}

export default NotificationController
