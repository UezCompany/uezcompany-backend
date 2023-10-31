const Chat = require('./Schemas/Chat')

const ChatModel = {
    getChats: async (id, userType) => {
        const chats = userType === 'uzer' ? await Chat.find({ uzerId: id }) : await Chat.find({ clienteId: id })
        return chats
    },
    getChatById: async (id) => {
        const chat = await Chat.findOne({ _id: id })
        return chat
    },
    // creatorId é quem está solicitando a criação do chat, requestedContactId é o id do usuário que ele quer contatar
    createChat: async (creatorId, requestedContactId, userType) => {
        const newChat = userType === 'uzer' ? await Chat.create({ uzerId: creatorId, clienteId: requestedContactId }) : await Chat.create({ clienteId: creatorId, uzerId: requestedContactId })
        return newChat
    },
    sendMessage: async (chatId, message, senderId, userType) => {
        const newMessage = await Chat.findOneAndUpdate({ _id: chatId }, { $push: { messages: { content: message, sendDate: new Date().toLocaleDateString(), sendHour: new Date().toLocaleTimeString(), senderId } } }, { new: true })
        return newMessage
    }
}


module.exports = ChatModel