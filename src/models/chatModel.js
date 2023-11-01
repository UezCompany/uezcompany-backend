const Chat = require('./Schemas/Chat')
const Uzer = require('./Schemas/Uzer')
const Cliente = require('./Schemas/Cliente')

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
    createChat: async (creatorId, requestedContactId, userType, uzerName, clienteName, uzerService) => {
        // Verifique se já existe um chat entre os dois usuários
        const existingChat = await Chat.findOne({
            $or: [
                { uzerId: creatorId, clienteId: requestedContactId },
                { uzerId: requestedContactId, clienteId: creatorId },
            ]
        });

        if (existingChat) {
            // Já existe um chat entre os usuários, retorne o chat existente
            return existingChat;
        }

        // Se não existe um chat entre os usuários, crie um novo chat
        let newChat;

        if (userType === 'uzer') {
            newChat = await Chat.create({ uzerId: creatorId, clienteId: requestedContactId, uzerName, clienteName, uzerService });
            await Uzer.updateOne({ _id: creatorId }, { $push: { chats: newChat._id } });
            await Cliente.updateOne({ _id: requestedContactId }, { $push: { chats: newChat._id } });
        }

        if (userType === 'cliente') {
            newChat = await Chat.create({ clienteId: creatorId, uzerId: requestedContactId, uzerName, clienteName, uzerService });
            await Cliente.updateOne({ _id: creatorId }, { $push: { chats: newChat._id } });
            await Uzer.updateOne({ _id: requestedContactId }, { $push: { chats: newChat._id } });
        }

        return newChat;
    },
    sendMessage: async (chatId, message, senderId, userType) => {
        const newMessage = await Chat.findOneAndUpdate({ _id: chatId }, { $push: { messages: { content: message, sendDate: new Date().toLocaleDateString(), sendHour: new Date().toLocaleTimeString(), senderId } } }, { new: true })
        return newMessage
    }
}


module.exports = ChatModel