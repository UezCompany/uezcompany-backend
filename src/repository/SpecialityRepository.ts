import { prisma } from "../infra/connection/prisma"

/*
  OBSERVAÇÃO: a obtenção de profissãos está no repository de specialities pois por enquanto, só é usado uma vez, por isso está implementado aqui.
*/

interface ISpecialityRepository {
  getSpecialities(): Promise<any>
  getSpecialitiesByProfession(profession: string): Promise<any>
  getSpecialitiesById(id: string): Promise<any>
  getProfessions(): Promise<any>
}

class SpecialityRepository implements ISpecialityRepository {
  getSpecialities = async () =>
    await prisma.speciality.findMany({
      select: {
        id: true,
        name: true,
        type: true,
        description: true,
        default_tax: true,
        completed_orders_amount: true,
        profession: true,
      },
    })

  async getSpecialitiesByProfession(profession: "Programação" | any) {
    return await prisma.speciality.findMany({
      where: {
        profession: {
          name: profession,
        },
      },
    })
  }

  async getSpecialitiesById(id: string) {
    return await prisma.speciality.findUnique({
      where: {
        id,
      },
      include: {
        profession: true,
      },
    })
  }

  async getProfessions() {
    return await prisma.profession.findMany()
  }
}

export const specialityRepository = new SpecialityRepository()
