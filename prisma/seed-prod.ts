import { prisma } from "../src/infra/connection/prisma"

async function main() {
  console.log("Seeding production data...")
  // Criando as categorias
  const arrayOfCategorias = [
    "Programação",
    "Videomaking",
    "Design",
    "Social Media",
  ]

  // Criando as categorias no banco de dados
  const categoryData = await prisma.category.createMany({
    data: arrayOfCategorias.map((name: string) => ({ name })),
    skipDuplicates: true,
  })

  // Dados dos serviços
  const servicesData = [
    { name: "Fullstack", type: "ONLINE", categoryName: "Programação" },
    { name: "Frontend", type: "ONLINE", categoryName: "Programação" },
    { name: "Backend", type: "ONLINE", categoryName: "Programação" },
    { name: "Games", type: "ONLINE", categoryName: "Programação" },
    { name: "Mobile", type: "ONLINE", categoryName: "Programação" },
    {
      name: "Engenharia de dados",
      type: "ONLINE",
      categoryName: "Programação",
    },
    { name: "Web", type: "ONLINE", categoryName: "Programação" },
    { name: "Criação de logo", type: "ONLINE", categoryName: "Design" },
    { name: "Papelaria", type: "ONLINE", categoryName: "Design" },
    { name: "Tipografia", type: "ONLINE", categoryName: "Design" },
    {
      name: "Artes para redes sociais",
      type: "ONLINE",
      categoryName: "Design",
    },
    { name: "Brand identity", type: "ONLINE", categoryName: "Design" },
    { name: "Ilustração 2d/3d", type: "ONLINE", categoryName: "Design" },
    { name: "UX/UI", type: "ONLINE", categoryName: "Design" },
    {
      name: "Gestão de editoriais",
      type: "ONLINE",
      categoryName: "Social Media",
    },
    {
      name: "Criação de conteúdo",
      type: "ONLINE",
      categoryName: "Social Media",
    },
    { name: "Copywriter", type: "ONLINE", categoryName: "Social Media" },
    {
      name: "Gestão de tráfego pago",
      type: "ONLINE",
      categoryName: "Social Media",
    },
    {
      name: "Gestão de comunidades",
      type: "ONLINE",
      categoryName: "Social Media",
    },
    {
      name: "Interação e monitoramento",
      type: "ONLINE",
      categoryName: "Social Media",
    },
    {
      name: "Relatório e análises",
      type: "ONLINE",
      categoryName: "Social Media",
    },
    {
      name: "Edição de vídeos longos",
      type: "ONLINE",
      categoryName: "Videomaking",
    },
    { name: "Roteirização", type: "ONLINE", categoryName: "Videomaking" },
    { name: "Narração", type: "ONLINE", categoryName: "Videomaking" },
    { name: "Animação 2D/3D", type: "ONLINE", categoryName: "Videomaking" },
    {
      name: "Edição de vídeos curtos",
      type: "ONLINE",
      categoryName: "Videomaking",
    },
    {
      name: "Gravação de vídeos promocionais",
      type: "ONLINE",
      categoryName: "Videomaking",
    },
    { name: "Edição de áudio", type: "ONLINE", categoryName: "Videomaking" },
  ]

  // Criando os serviços no banco de dados
  for (const service of servicesData) {
    const category = await prisma.category.findUnique({
      where: { name: service.categoryName },
    })

    if (category) {
      await prisma.service.create({
        data: {
          name: service.name,
          type: "ONLINE",
          category: {
            connect: {
              id: category.id,
            },
          },
        },
      })
    }
  }

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
