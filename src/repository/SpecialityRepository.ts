import { prisma } from "../infra/connection/prisma"

/*
  OBSERVAÇÃO: a obtenção de profissãos está no repository de specialities pois por enquanto, só é usado uma vez, por isso está implementado aqui.
*/

interface ISpecialityRepository {
  getSpecialities(): Promise<any>
  getSpecialitiesByProfession(professionName: string): Promise<any>
  getSpecialitiesById(id: string): Promise<any>
  getProfessions(): Promise<any>
  getProfessionByName(professionName: string): Promise<any>
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

  async getSpecialitiesByProfession(professionName: string) {
    return await prisma.speciality.findMany({
      where: {
        profession: {
          name: professionName,
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

  async getProfessionByName(professionName: string) {
    return await prisma.profession.findUnique({
      where: {
        name: professionName,
      },
    })
  }
}

export const specialityRepository = new SpecialityRepository()
