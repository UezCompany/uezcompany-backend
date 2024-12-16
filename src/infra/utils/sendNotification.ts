import { prisma } from "@/infra/connection/prisma"

/**
 *
 * @param receiverId
 * @param content
 * @param type
 * @returns
 */
export default async function sendNotification(
  receiverId: string,
  content: string,
  type:
    | "orcaReceb"
    | "servFim"
    | "solicitUzer"
    | "pedLance"
    | "ban"
    | "parabens"
    | "solicitCliente"
    | "orcaAceito"
    | "orcaNeg"
    | "servAval"
    | "erro",
) {
  return await prisma.notification.create({
    data: {
      content,
      receiver: {
        connect: {
          id: receiverId,
        },
      },
      type,
    },
  })
}
