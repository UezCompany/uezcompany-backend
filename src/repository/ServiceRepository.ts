import { prisma } from "../infra/connection/prisma"

/*

  OBSERVAÇÃO: a obtenção de categorias está no repository de servicos pois por enquanto, só é usado uma vez, por isso está implementado aqui.

*/

interface IServiceRepository {
  getServices(): Promise<any>
  getServicesByCategory(category: string): Promise<any>
  getServicesById(id: string): Promise<any>
  getCategories(): Promise<any>
}

class ServiceRepository implements IServiceRepository {
  getServices = async () => await prisma.servicos.findMany()

  async getServicesByCategory(category: string) {
    return await prisma.servicos.findMany({
      where: {
        categoria: {
          nome: category,
        },
      },
    })
  }

  async getServicesById(id: string) {
    return await prisma.servicos.findUnique({
      where: {
        id,
      },
      include: {
        categoria: true,
      },
    })
  }

  async getCategories() {
    return await prisma.categorias.findMany()
  }
}

export const serviceRepository = new ServiceRepository()
