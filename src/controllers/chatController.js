const getUserDataById = require('../functions/getUserDataById')
const chatModel = require('../models/chatModel')

const ChatController = {
    getChats: async (req, res) => {

        const { userId, userType } = req.body

        try {
            const chats = await chatModel.getChats(userId, userType)
            res.status(200).json(chats)
        } catch (error) {
            console.error('Erro ao obter os chats: ' + error.stack)
            res.status(500).json({ message: 'Erro ao obter os chats' })
        }
    },
    createChat: async (req, res) => {
        const { userId } = req.body
        console.log(userId)
        const { requestedContactId } = req.params

        const currentData = await getUserDataById(userId)
        const otherSideData = await getUserDataById(requestedContactId)
        const uzerData = currentData.userType === 'uzer' ? currentData : otherSideData
        const clienteData = currentData.userType === 'cliente' ? currentData : otherSideData

        try {
            const chat = await chatModel.createChat(userId, requestedContactId, currentData.userType, uzerData.nome, clienteData.nome, uzerData.servicosPrestados[0].nomeServico)
            res.status(200).json(chat)
        } catch (error) {
            console.error('Erro ao criar chat: ' + error.stack)
            res.status(500).json({ message: 'Erro ao criar chat' })
        }
    }

}

module.exports = ChatController