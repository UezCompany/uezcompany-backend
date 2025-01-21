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
        type: "congratsForSignup",
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
  serviceCompleted: async (receiverId: string, uezerName: string) => {
    await prisma.notification.create({
      data: {
        content: `${uezerName} finalizou seu serviço, avalie-o.`,
        receiver: {
          connect: {
            id: receiverId,
          },
        },
        type: "serviceCompleted",
      },
    })
  },

  clientMessageRequest: async (receiverId: string, client: string) => {
    await prisma.notification.create({
      data: {
        content: `${client} mandou mensagem para você!`,
        receiver: {
          connect: {
            id: receiverId,
          },
        },
        type: "clientMessageRequest",
      },
    })
  },
  quoteAccepted: async (
    receiverId: string,
    client: string,
    balance: string,
  ) => {
    await prisma.notification.create({
      data: {
        content: `${client} Aceitou seu orçamento no valor de R$ ${balance}`,
        receiver: {
          connect: {
            id: receiverId,
          },
        },
        type: "quoteAccepted",
      },
    })
  },
  quoteDeclined: async (
    receiverId: string,
    client: string,
    balance: string,
  ) => {
    await prisma.notification.create({
      data: {
        content: `${client} recusou seu orçamento no valor de ${balance}`,
        receiver: {
          connect: {
            id: receiverId,
          },
        },
        type: "quoteDeclined",
      },
    })
  },
  errorOcurred: async (receiverId: string, service: string) => {
    await prisma.notification.create({
      data: {
        content: `O serviço ${service} está sendo analisado`,
        receiver: {
          connect: {
            id: receiverId,
          },
        },
        type: "errorOcurred",
      },
    })
  },
  uzerMessageRequest: async (receiverId: string, uezer: string) => {
    await prisma.notification.create({
      data: {
        content: `${uezer} mandou mensagem para você!`,
        receiver: {
          connect: {
            id: receiverId,
          },
        },
        type: "uzerMessageRequest",
      },
    })
  },
  uezerSendedQuote: async (receiverId: string, uezer: string) => {
    await prisma.notification.create({
      data: {
        content: `${uezer} mandou um orçamento para você!`,
        receiver: {
          connect: {
            id: receiverId,
          },
        },
        type: "uezerSendedQuote",
      },
    })
  },
}

export { sendNotification }
