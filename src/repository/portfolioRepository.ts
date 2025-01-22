import { prisma } from "@/infra/connection/prisma"

interface IPortfolioRepository {
  createPortfolio(id: string): Promise<any>
  getPortfolioById(id: string): Promise<any>
  deletePortfolio(id: string): Promise<any>
  getAllPortfolioBySlug(slug: string): Promise<any>
  getAllPortfolioBySlugOnOrder(slug: string): Promise<any>
}

class PortfolioRepository implements IPortfolioRepository {
  getAllPortfolioBySlugOnOrder(slug: string): Promise<any> {
    return prisma.portfolio.findMany({
      where: {
        order: {
          uezer: {
            id: slug,
          },
        },
      },
      include: {
        order: true,
      },
    })
  }

  async getAllPortfolioBySlug(slug: string): Promise<any> {
    return await prisma.portfolio.findMany({
      where: {
        order: {
          uezer: {
            username: slug,
          },
        },
      },
    })
  }

  async deletePortfolio(id: string): Promise<any> {
    return await prisma.portfolio.delete({ where: { id } })
  }
  async getPortfolioById(id: string): Promise<any> {
    return await prisma.portfolio.findUnique({
      where: { id },
    })
  }

  async createPortfolio(id: string): Promise<any> {
    return await prisma.portfolio.create({
      data: {
        order: {
          connect: {
            id,
          },
        },
      },
    })
  }
}

export const portfolioRepository = new PortfolioRepository()
