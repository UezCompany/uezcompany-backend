import { prisma } from "../connection/prisma"

// type NotificationType =
//   | "congratsForSignup" // Parabéns por se cadastrar
//   | "serviceRated" // Serviço avaliado
//   | "orderCreated" // Pedido criado

const sendNotification = {
  congratsForSignup: async (receiverId: string, userName: string) => {
    await prisma.notification.create({
      data: {
        content: `Seja bem-vindo(a) ${userName}, ficamos muito felizes em ter você conosco!`,
        receiver: {
          connect: {
            id: receiverId,
          },
        },
        type: "congrats",
      },
    })
  },
  orderCreated: async (receiverId: string) => {
    await prisma.notification.create({
      data: {
        content: "Em breve um uezer mandará mensagem.",
        receiver: {
          connect: {
            id: receiverId,
          },
        },
        type: "orderCreated",
      },
    })
  },
  serviceRated: async (
    receiverId: string,
    orderValue: number,
    orderTitle: string,
  ) => {
    await prisma.notification.create({
      data: {
        content: `R$ ${orderValue} do Pedido: "${orderTitle}" já está na sua carteira.`,
        receiver: {
          connect: {
            id: receiverId,
          },
        },
        type: "serviceRated",
      },
    })
  },
}

export { sendNotification }
