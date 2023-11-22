const NotificationModel = require('../models/notificationsModel')

const NotificationController = {
    getAllNotifications: async (req, res) => {
        const { idUser } = req.body
        try {
            const notifications = await NotificationModel.getNotifications(idUser)
            res.status(200).json(notifications)
        } catch (error) {
            console.error('Erro ao obter as notificações: ' + error.stack)
            res.status(500).json({ message: 'Erro ao obter as notificações' })
        }
    },
    sendNotification: async (req, res) => {
        const { userId } = req.params
        try {
            const notifications = await NotificationModel.pushNotifications(idUser)
            res.status(200).json(notifications)
        } catch (error) {
            console.error('Erro ao enviar a notificação: ' + error.stack)
            res.status(500).json({ message: 'Erro ao enviar a notificação' })
        }
    },
    markAsRead: async (req, res) => {
        const { notificationId } = req.params
        try {
            const notifications = await NotificationModel.markAsRead(notificationId)
            res.status(200).json(notifications)
        } catch (error) {
            console.error('Erro ao obter as notificações: ' + error.stack)
            res.status(500).json({ message: 'Erro ao obter as notificações' })
        }
    }

}

module.exports = NotificationController
