const Notifications = require("./Schemas/Notifications")


const notificationsModel = {
    getNotifications: async (idUser) => {
        const notifications = await Notifications.find({ _idUser: idUser })
        return notifications
    },
    pushNotifications: async (idUser, content, type) => {
        const push = await Notifications.create({ type: type, content: content, _idUser: idUser })
        return push
    },
    markAsRead: async (idNotification) => {
        const push = await Notifications.updateOne({_id: idNotification}, { readed: true })
        return push
    },
    deleteNotification: async (idNotifications) => {
        const deletedNotification = await Notifications.deleteOne({ _id: idNotifications })
        return deletedNotification
    }

}

module.exports=notificationsModel
