const Chat = require('./Schemas/Chat');

const ChatModel = {
    getChats: async (id, userType) => {
        const chats = userType === 'uzer' ? await Chat.find({ _idUzer: id }) : await Chat.find({ _idCliente: id });
        return chats
    },
    getChatById: async (id) => {
        const chat = await Chat.findOne({ _id: id });
        return chat
    },
    // creatorId é quem está solicitando a criação do chat, requestedContactId é o id do usuário que ele quer contatar
    createChat: async (creatorId, requestedContactId, userType) => {
        const newChat = userType === 'uzer' ? await Chat.create({ _idUzer: creatorId, _idCliente: requestedContactId }) : await Chat.create({ _idCliente: creatorId, _idUzer: requestedContactId });
        return newChat
    },
}


module.exports = ChatModel