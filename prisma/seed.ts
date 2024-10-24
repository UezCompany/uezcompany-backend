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
      categoryId: "636727e9-7108-4f33-b6dc-fa9e63ac024d",
      categoryName: "Programação",
    },
    {
      name: "Frontend",
      type: "ONLINE",
      categoryId: "636727e9-7108-4f33-b6dc-fa9e63ac024d",
      categoryName: "Programação",
    },
    {
      name: "Backend",
      type: "ONLINE",
      categoryId: "636727e9-7108-4f33-b6dc-fa9e63ac024d",
      categoryName: "Programação",
    },
    {
      name: "Games",
      type: "ONLINE",
      categoryId: "636727e9-7108-4f33-b6dc-fa9e63ac024d",
      categoryName: "Programação",
    },
    {
      name: "Mobile",
      type: "ONLINE",
      categoryId: "636727e9-7108-4f33-b6dc-fa9e63ac024d",
      categoryName: "Programação",
    },
    {
      name: "Engenharia de dados",
      type: "ONLINE",
      categoryId: "636727e9-7108-4f33-b6dc-fa9e63ac024d",
      categoryName: "Programação",
    },
    {
      name: "Web",
      type: "ONLINE",
      categoryId: "636727e9-7108-4f33-b6dc-fa9e63ac024d",
      categoryName: "Programação",
    },
    {
      name: "Criação de logo",
      type: "ONLINE",
      categoryId: "265ef027-b4f8-475d-9975-a6b0caa90da9",
      categoryName: "Design",
    },
    {
      name: "Papelaria",
      type: "ONLINE",
      categoryId: "265ef027-b4f8-475d-9975-a6b0caa90da9",
      categoryName: "Design",
    },
    {
      name: "Tipografia",
      type: "ONLINE",
      categoryId: "265ef027-b4f8-475d-9975-a6b0caa90da9",
      categoryName: "Design",
    },
    {
      name: "Artes para redes sociais",
      type: "ONLINE",
      categoryId: "265ef027-b4f8-475d-9975-a6b0caa90da9",
      categoryName: "Design",
    },
    {
      name: "Brand identity",
      type: "ONLINE",
      categoryId: "265ef027-b4f8-475d-9975-a6b0caa90da9",
      categoryName: "Design",
    },
    {
      name: "Ilustração 2d/3d",
      type: "ONLINE",
      categoryId: "265ef027-b4f8-475d-9975-a6b0caa90da9",
      categoryName: "Design",
    },
    {
      name: "UX/UI",
      type: "ONLINE",
      categoryId: "265ef027-b4f8-475d-9975-a6b0caa90da9",
      categoryName: "Design",
    },
    {
      name: "Gestão de editoriais",
      type: "ONLINE",
      categoryId: "31acc993-b76b-431a-a83a-81017a20e92f",
      categoryName: "Social Media",
    },
    {
      name: "Criação de conteúdo",
      type: "ONLINE",
      categoryId: "31acc993-b76b-431a-a83a-81017a20e92f",
      categoryName: "Social Media",
    },
    {
      name: "Copywriter",
      type: "ONLINE",
      categoryId: "31acc993-b76b-431a-a83a-81017a20e92f",
      categoryName: "Social Media",
    },
    {
      name: "Gestão de tráfego pago",
      type: "ONLINE",
      categoryId: "31acc993-b76b-431a-a83a-81017a20e92f",
      categoryName: "Social Media",
    },
    {
      name: "Gestão de comunidades",
      type: "ONLINE",
      categoryId: "31acc993-b76b-431a-a83a-81017a20e92f",
      categoryName: "Social Media",
    },
    {
      name: "Interação e monitoramento",
      type: "ONLINE",
      categoryId: "31acc993-b76b-431a-a83a-81017a20e92f",
      categoryName: "Social Media",
    },
    {
      name: "Relatório e análises",
      type: "ONLINE",
      categoryId: "31acc993-b76b-431a-a83a-81017a20e92f",
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
