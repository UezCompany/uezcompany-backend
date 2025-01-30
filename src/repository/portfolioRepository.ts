import { prisma } from "@/infra/connection/prisma"

interface IPortfolioRepository {
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
    const deletedPortfolio = await prisma.portfolio.delete({ where: { id } })
    if (deletedPortfolio.orderId) {
      await prisma.order.update({
        where: {
          id: deletedPortfolio.orderId,
        },
        data: {
          Portfolio: {
            disconnect: true,
          },
        },
      })
    }

    return deletedPortfolio
  }
  async getPortfolioById(id: string): Promise<any> {
    return await prisma.portfolio.findUnique({
      where: { id },
    })
  }
}

export const portfolioRepository = new PortfolioRepository()
