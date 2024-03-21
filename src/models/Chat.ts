import { prisma } from "@/lib/prisma"

const ChatModel = {
  getChats: async (id: string, userType: string) => {
    const chats =
      userType === "uzer"
        ? await prisma.chats.findFirst({ where: { uzerId: id } })
        : await prisma.chats.findFirst({ where: { clienteId: id } })
    return chats
  },
  getChatById: async (id: string) => {
    const chat = await prisma.chats.findFirst({ where: { id } })
    return chat
  },
  // creatorId é quem está solicitando a criação do chat, requestedContactId é o id do usuário que ele quer contatar
  createChat: async (
    creatorId: string,
    requestedContactId: string,
    userType: string,
  ) => {
    const existingChat = await prisma.chats.findFirst({
      where: {
        OR: [
          { uzerId: creatorId, clienteId: requestedContactId },
          { uzerId: requestedContactId, clienteId: creatorId },
        ],
      },
    })

    if (existingChat) {
      return existingChat
    }

    let newChat

    if (userType === "uzer") {
      newChat = await prisma.chats.create({
        data: {
          uzerId: creatorId,
          clienteId: requestedContactId,
        },
      })
      await prisma.uzers.update({
        data: {
          chats: {
            push: newChat.id,
          },
        },
        where: {
          id: creatorId,
        },
      })
      await prisma.clientes.update({
        data: {
          chats: {
            push: newChat.id,
          },
        },
        where: {
          id: requestedContactId,
        },
      })
    }

    if (userType === "cliente") {
      newChat = await prisma.chats.create({
        data: {
          clienteId: creatorId,
          uzerId: requestedContactId,
        },
      })
      await prisma.uzers.update({
        data: {
          chats: {
            push: newChat.id,
          },
        },
        where: {
          id: creatorId,
        },
      })
      await prisma.clientes.update({
        data: {
          chats: {
            push: newChat.id,
          },
        },
        where: {
          id: requestedContactId,
        },
      })
    }

    return newChat
  },
  sendMessage: async (
    chatId: string,
    message: string,
    senderId: string,
    sendDate: Date,
  ) => {
    const chatWithNewMessage = await prisma.chats.update({
      where: {
        id: chatId,
      },
      data: {
        messages: {
          push: {
            content: message,
            sendDate,
            senderId,
            type: "message",
          },
        },
      },
    })
    return chatWithNewMessage
  },
  sendBudgetMessage: async (
    chatId: string,
    message: string,
    senderId: string,
    sendDate: Date,
    sendHour: Date,
    idPedido: string,
  ) => {
    const chatWithNewMessage = await prisma.chats.update({
      where: {
        id: chatId,
      },
      data: {
        messages: {
          push: {
            content: message,
            sendDate,
            senderId,
            type: "budget",
            idPedido: idPedido,
          },
        },
      },
    })
    return chatWithNewMessage
  },
}

export default ChatModel
