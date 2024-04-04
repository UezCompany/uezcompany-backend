import { prisma } from "../src/lib/prisma"
async function main() {
  const arrayOfCategorias = [
    "Programação",
    "Videomaking",
    "Design",
    "Social Media",
  ]

  const categoryData = await prisma.categorias.createMany({
    data: arrayOfCategorias.map((nome: string) => ({ nome })),
    skipDuplicates: true,
  })

  console.log(categoryData)
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
