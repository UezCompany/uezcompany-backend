import { prisma } from "@/infra/connection/prisma"

interface IChatRepository {
     getChatById(id: string): Promise<any>
     sendMessage(content: string, chatId: string, receiverId: string, id: string): Promise<any>
     createChat(myContact: string, requestedContact: string): Promise<any>
     sendBudget(chatId: string, value: number, idPedido: string, receiverId: string, id: string): Promise<any>
}

class ChatRepository implements IChatRepository {
     async sendBudget(chatId: string, value: number, idPedido: string, receiverId: string, id: string): Promise<any> {
          return await prisma.message.create({
               data: {
                    content: String(value),
                    type: "BUDGET",
                    senderId: id,
                    receiverId,
                    chat: {
                         connect: {
                              id: chatId,
                         },
                    },
                    order: {
                         connect: {
                              id: idPedido,
                         },
                    },
               },
          })

     }
     async createChat(myContact: string, requestedContact: string): Promise<any> {
          return await prisma.chat.create({
               data: {
                    users: {
                         connect: [{ id: myContact }, { id: requestedContact }],
                    },
               },
          })
     }

     async sendMessage(content: string, chatId: string, receiverId: string, id: string): Promise<any> {
          return await prisma.message.create({
               data: {
                    content,
                    senderId: id,
                    receiverId,
                    chat: {
                         connect: {
                              id: chatId,
                         },
                    },
               },
          })
     }

     async getChatById(id: string): Promise<any> {
          return await prisma.chat.findMany({
               where: {
                    users: {
                         some: {
                              id,
                         },
                    },
               },
               include: {
                    messages: true,
                    users: true,
               },
          })
     }
}

export const chatRepository = new ChatRepository()