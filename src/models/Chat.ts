import Chat from "@/schemas/Chat"
import Uzer from "@/schemas/Uzer"
import Cliente from "@/schemas/Cliente"

const ChatModel = {
  getChats: async (id: string, userType: string) => {
    const chats =
      userType === "uzer"
        ? await Chat.find({ uzerId: id })
        : await Chat.find({ clienteId: id })
    return chats
  },
  getChatById: async (id: string) => {
    const chat = await Chat.findOne({ _id: id })
    return chat
  },
  // creatorId é quem está solicitando a criação do chat, requestedContactId é o id do usuário que ele quer contatar
  createChat: async (
    creatorId: string,
    requestedContactId: string,
    userType: string,
    uzerName: string,
    clienteName: string,
    uzerService: string,
    photo: string,
  ) => {
    // Verifique se já existe um chat entre os dois usuários
    const existingChat = await Chat.findOne({
      $or: [
        { uzerId: creatorId, clienteId: requestedContactId },
        { uzerId: requestedContactId, clienteId: creatorId },
      ],
    })

    if (existingChat) {
      // Já existe um chat entre os usuários, retorne o chat existente
      return existingChat
    }

    // Se não existe um chat entre os usuários, crie um novo chat
    let newChat

    if (userType === "uzer") {
      newChat = await Chat.create({
        uzerId: creatorId,
        clienteId: requestedContactId,
        uzerName,
        clienteName,
        uzerService,
        photo,
      })
      await Uzer.updateOne(
        { _id: creatorId },
        { $push: { chats: newChat._id } },
      )
      await Cliente.updateOne(
        { _id: requestedContactId },
        { $push: { chats: newChat._id } },
      )
    }

    if (userType === "cliente") {
      newChat = await Chat.create({
        clienteId: creatorId,
        uzerId: requestedContactId,
        uzerName,
        clienteName,
        uzerService,
        photo,
      })
      await Cliente.updateOne(
        { _id: creatorId },
        { $push: { chats: newChat._id } },
      )
      await Uzer.updateOne(
        { _id: requestedContactId },
        { $push: { chats: newChat._id } },
      )
    }

    return newChat
  },
  sendMessage: async (
    chatId: string,
    message: string,
    senderId: string,
    sendDate: Date,
    sendHour: Date,
  ) => {
    const chatWithNewMessage = await Chat.findOneAndUpdate(
      { _id: chatId },
      {
        $push: { messages: { content: message, sendDate, sendHour, senderId } },
      },
      { new: true },
    )
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
    const chatWithNewMessage = await Chat.findOneAndUpdate(
      { _id: chatId },
      {
        $push: {
          messages: {
            content: message,
            sendDate,
            sendHour,
            senderId,
            type: "budget",
            _idPedido: idPedido,
          },
        },
      },
      { new: true },
    )
    return chatWithNewMessage
  },
  sendImageMessage: async (
    chatId: string,
    message: string,
    senderId: string,
    sendDate: Date,
    sendHour: Date,
  ) => {
    const chatWithNewMessage = await Chat.findOneAndUpdate(
      { _id: chatId },
      {
        $push: {
          messages: {
            content: message,
            sendDate,
            sendHour,
            senderId,
            type: "image",
          },
        },
      },
      { new: true },
    )
    return chatWithNewMessage
  },
  deleteChat: async (chatId: string) => {
    const deletedChat = await Chat.deleteOne({ _id: chatId })
    console.log(deletedChat)
    await Uzer.updateOne(
      { chats: { _idChat: chatId } },
      { $pull: { chats: { _idChat: chatId } } },
    )
    await Cliente.updateOne(
      { chats: { _idChat: chatId } },
      { $pull: { chats: { _idChat: chatId } } },
    )
    return deletedChat
  },
}

export default ChatModel
