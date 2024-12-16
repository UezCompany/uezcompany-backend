import { prisma } from "../infra/connection/prisma"

/*
  OBSERVAÇÃO: a obtenção de categorias está no repository de services pois por enquanto, só é usado uma vez, por isso está implementado aqui.
*/

interface IServiceRepository {
  getServices(): Promise<any>
  getServicesByCategory(category: string): Promise<any>
  getServicesById(id: string): Promise<any>
  getCategories(): Promise<any>
}

class ServiceRepository implements IServiceRepository {
  getServices = async () =>
    await prisma.service.findMany({
      select: {
        id: true,
        name: true,
        type: true,
        description: true,
        default_tax: true,
        completed_orders_amount: true,
        category: true,
      },
    })

  async getServicesByCategory(category: "Programação" | any) {
    return await prisma.service.findMany({
      where: {
        category: {
          name: category,
        },
      },
    })
  }

  async getServicesById(id: string) {
    return await prisma.service.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
      },
    })
  }

  async getCategories() {
    return await prisma.category.findMany()
  }
}

export const serviceRepository = new ServiceRepository()
