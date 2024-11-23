import { prisma } from "../src/infra/connection/prisma"
import bcrypt from "bcrypt"

async function main() {
  const arrayOfCategorias = [
    "Programação",
    "Videomaking",
    "Design",
    "Social Media",
  ]

  const categoryData = await prisma.category.createMany({
    data: arrayOfCategorias.map((name: string) => ({ name })),
    skipDuplicates: true,
  })

  const servicesData = [
    {
      name: "Fullstack",
      type: "ONLINE",
      categoryName: "Programação",
    },
    {
      name: "Frontend",
      type: "ONLINE",
      categoryName: "Programação",
    },
    {
      name: "Backend",
      type: "ONLINE",
      categoryName: "Programação",
    },
    {
      name: "Games",
      type: "ONLINE",
      categoryName: "Programação",
    },
    {
      name: "Mobile",
      type: "ONLINE",
      categoryName: "Programação",
    },
    {
      name: "Engenharia de dados",
      type: "ONLINE",
      categoryName: "Programação",
    },
    {
      name: "Web",
      type: "ONLINE",
      categoryName: "Programação",
    },
    {
      name: "Criação de logo",
      type: "ONLINE",
      categoryName: "Design",
    },
    {
      name: "Papelaria",
      type: "ONLINE",
      categoryName: "Design",
    },
    {
      name: "Tipografia",
      type: "ONLINE",
      categoryName: "Design",
    },
    {
      name: "Artes para redes sociais",
      type: "ONLINE",
      categoryName: "Design",
    },
    {
      name: "Brand identity",
      type: "ONLINE",
      categoryName: "Design",
    },
    {
      name: "Ilustração 2d/3d",
      type: "ONLINE",
      categoryName: "Design",
    },
    {
      name: "UX/UI",
      type: "ONLINE",
      categoryName: "Design",
    },
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
    {
      name: "Copywriter",
      type: "ONLINE",
      categoryName: "Social Media",
    },
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
      name: "Edição de vídeos",
      type: "ONLINE",
      categoryName: "Videomaking",
    },
    {
      name: "Roteirização",
      type: "ONLINE",
      categoryName: "Videomaking",
    },
    {
      name: "Narração",
      type: "ONLINE",
      categoryName: "Videomaking",
    },
    {
      name: "Animação 2D/3D",
      type: "ONLINE",
      categoryName: "Videomaking",
    },
    {
      name: "Operação de câmera",
      type: "ONLINE",
      categoryName: "Videomaking",
    },
    {
      name: "Operação de áudio",
      type: "ONLINE",
      categoryName: "Videomaking",
    },
    {
      name: "Operação de iluminação",
      type: "ONLINE",
      categoryName: "Videomaking",
    },
  ]

  servicesData.forEach(async (categoryName) => {
    await prisma.service.create({
      data: {
        name: categoryName.name,
        type: "ONLINE",
        category: {
          connect: {
            name: categoryName.categoryName,
          },
        },
      },
    })
  })

  console.log(categoryData)

  const client = await prisma.user.create({
    data: {
      name: "Cliente",
      birth_date: "1990-01-01",
      username: "cliente",
      email: "cliente@gmail.com",
      usertype: "CLIENT",
      password: bcrypt.hashSync("cliente123", 10),
    },
  })

  const uzer = await prisma.user.create({
    data: {
      name: "Uzer",
      birth_date: "1990-01-01",
      username: "uzer",
      email: "uzer@gmail.com",
      usertype: "UZER",
      password: bcrypt.hashSync("uzer123", 10),
    },
  })

  const order = await prisma.order.create({
    data: {
      title: "Order",
      description: "Description",
      client: {
        connect: {
          id: client.id,
        },
      },
      uzer: {
        connect: {
          id: uzer.id,
        },
      },
      service: {
        connect: {
          name: "Fullstack",
        },
      },
    },
  })

  console.log(client, uzer, order)
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
