import getUserDataById from "@/functions/getUserDataById"
import chatModel from "@/models/Chat"
import { Request, Response } from "express"

const ChatController = {
  getChats: async (req: Request, res: Response) => {
    const { userId, userType } = req.body

    try {
      const chats = await chatModel.getChats(userId, userType)
      res.status(200).json(chats)
    } catch (error: any) {
      console.error("Erro ao obter os chats: " + error.stack)
      res.status(500).json({ message: "Erro ao obter os chats" })
    }
  },
  createChat: async (req: Request, res: Response) => {
    const { userId } = req.body
    const { requestedContactId } = req.params

    const currentData = await getUserDataById(userId)
    const otherSideData = await getUserDataById(requestedContactId)

    if (!currentData || !otherSideData) {
      return res.status(404).json({ message: "Uzer ou cliente não encontrado" })
    }

    const uzerData =
      currentData.userType === "uzer" ? currentData : otherSideData
    const clienteData =
      currentData.userType === "cliente" ? currentData : otherSideData

    try {
      const chat = await chatModel.createChat(
        userId,
        requestedContactId,
        currentData.userType,
        uzerData.nome,
        clienteData.nome,
        // @ts-expect-error FIXME: type error
        uzerData.servicosPrestados[0].nomeServico,
        uzerData.photoUrl,
      )

      res.status(200).json(chat)
    } catch (error: any) {
      console.error("Erro ao criar chat: " + error.stack)
      res.status(500).json({ message: "Erro ao criar chat" })
    }
  },

  sendMessage: async (req: Request, res: Response) => {
    const { userId: senderId, chatId, message, sendDate, sendHour } = req.body

    try {
      const chatWithNewMessage: any = await chatModel.sendMessage(
        chatId,
        message,
        senderId,
        sendDate,
        sendHour,
      )
      res
        .status(200)
        .json(
          chatWithNewMessage.messages[chatWithNewMessage.messages.length - 1],
        )
    } catch (error: any) {
      console.error("Erro ao enviar mensagem: " + error.stack)
      res.status(500).json({ message: "Erro ao enviar mensagem" })
    }
  },

  sendBudgetMessage: async (req: Request, res: Response) => {
    //nesse caso, o message vai ser o valor do orçamento
    const {
      userId: senderId,
      chatId,
      message,
      sendDate,
      sendHour,
      idPedido,
    } = req.body

    try {
      const chatWithNewMessage: any = await chatModel.sendBudgetMessage(
        chatId,
        message,
        senderId,
        sendDate,
        sendHour,
        idPedido,
      )
      res
        .status(200)
        .json(
          chatWithNewMessage.messages[chatWithNewMessage.messages.length - 1],
        )
    } catch (error: any) {
      console.error("Erro ao enviar mensagem: " + error.stack)
      res.status(500).json({ message: "Erro ao enviar mensagem" })
    }
  },

  sendImageMessage: async (req: Request, res: Response) => {
    const { userId: senderId, chatId, message, sendDate, sendHour } = req.body

    if (req.params.messageType) {
      console.log("Tipo da mensagem: " + req.params.messageType)
      switch (req.params.messageType) {
        case "text":
          break
        case "image":
          break
        case "budget":
          break
        default:
          break
      }
    }

    try {
      const chatWithNewMessage: any = await chatModel.sendMessage(
        chatId,
        message,
        senderId,
        sendDate,
        sendHour,
      )
      res
        .status(200)
        .json(
          chatWithNewMessage.messages[chatWithNewMessage.messages.length - 1],
        )
    } catch (error: any) {
      console.error("Erro ao enviar mensagem: " + error.stack)
      res.status(500).json({ message: "Erro ao enviar mensagem" })
    }
  },
  
  deleteChat: async (req: Request, res: Response) => {
    const { chatId } = req.params
    try {
      const chat = await chatModel.deleteChat(chatId)
      res.status(200).json(chat)
    } catch (error: any) {
      console.error("Erro ao deletar chat: " + error.stack)
      res.status(500).json({ message: "Erro ao deletar chat" })
    }
  },
}

export default ChatController
