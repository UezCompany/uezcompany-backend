import { prisma } from "../infra/connection/prisma"

interface IServiceRepository {
  getServices(): Promise<any>
}

class ServiceRepository implements IServiceRepository {
  getServices = async () => await prisma.servicos.findMany()
}

export const serviceRepository = new ServiceRepository()
