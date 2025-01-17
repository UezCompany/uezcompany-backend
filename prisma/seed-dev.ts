import { prisma } from "../src/infra/connection/prisma"
import bcrypt from "bcrypt"

export async function main() {
  console.log("Cleaning database...")

  // Deletando todos os registros das tabelas relevantes
  await prisma.order.deleteMany({})
  await prisma.user.deleteMany({})
  await prisma.speciality.deleteMany({})
  await prisma.profession.deleteMany({})

  console.log("Seeding development data...")

  // Criando as profissãos
  const arrayOfProfissãos = [
    "Programação",
    "Videomaking",
    "Design",
    "Social Media",
  ]

  // Criando as profissãos no banco de dados
  const professionData = await prisma.profession.createMany({
    data: arrayOfProfissãos.map((name: string) => ({ name })),
    skipDuplicates: true,
  })

  // Dados dos Especialidades
  const specialitiesData = [
    { name: "Fullstack", type: "ONLINE", professionName: "Programação" },
    { name: "Frontend", type: "ONLINE", professionName: "Programação" },
    { name: "Backend", type: "ONLINE", professionName: "Programação" },
    { name: "Games", type: "ONLINE", professionName: "Programação" },
    { name: "Mobile", type: "ONLINE", professionName: "Programação" },
    {
      name: "Engenharia de dados",
      type: "ONLINE",
      professionName: "Programação",
    },
    { name: "Web", type: "ONLINE", professionName: "Programação" },
    { name: "Criação de logo", type: "ONLINE", professionName: "Design" },
    { name: "Papelaria", type: "ONLINE", professionName: "Design" },
    { name: "Tipografia", type: "ONLINE", professionName: "Design" },
    {
      name: "Artes para redes sociais",
      type: "ONLINE",
      professionName: "Design",
    },
    { name: "Brand identity", type: "ONLINE", professionName: "Design" },
    { name: "Ilustração 2d/3d", type: "ONLINE", professionName: "Design" },
    { name: "UX/UI", type: "ONLINE", professionName: "Design" },
    {
      name: "Gestão de editoriais",
      type: "ONLINE",
      professionName: "Social Media",
    },
    {
      name: "Criação de conteúdo",
      type: "ONLINE",
      professionName: "Social Media",
    },
    { name: "Copywriter", type: "ONLINE", professionName: "Social Media" },
    {
      name: "Gestão de tráfego pago",
      type: "ONLINE",
      professionName: "Social Media",
    },
    {
      name: "Gestão de comunidades",
      type: "ONLINE",
      professionName: "Social Media",
    },
    {
      name: "Interação e monitoramento",
      type: "ONLINE",
      professionName: "Social Media",
    },
    {
      name: "Relatório e análises",
      type: "ONLINE",
      professionName: "Social Media",
    },
    {
      name: "Edição de vídeos longos",
      type: "ONLINE",
      professionName: "Videomaking",
    },
    { name: "Roteirização", type: "ONLINE", professionName: "Videomaking" },
    { name: "Narração", type: "ONLINE", professionName: "Videomaking" },
    { name: "Animação 2D/3D", type: "ONLINE", professionName: "Videomaking" },
    {
      name: "Edição de vídeos curtos",
      type: "ONLINE",
      professionName: "Videomaking",
    },
    {
      name: "Gravação de vídeos promocionais",
      type: "ONLINE",
      professionName: "Videomaking",
    },
    { name: "Edição de áudio", type: "ONLINE", professionName: "Videomaking" },
  ]

  // Criando os Especialidades no banco de dados
  for (const speciality of specialitiesData) {
    const profession = await prisma.profession.findUnique({
      where: { name: speciality.professionName },
    })

    if (profession) {
      await prisma.speciality.create({
        data: {
          name: speciality.name,
          type: "ONLINE",
          profession: {
            connect: {
              id: profession.id,
            },
          },
        },
      })
    }
  }

  console.log(professionData)

  // Criando um usuário cliente
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

  // Criando um usuário uezer
  const uezer = await prisma.user.create({
    data: {
      name: "Uezer",
      birth_date: "1990-01-01",
      username: "uezer",
      email: "uezer@gmail.com",
      usertype: "UEZER",
      password: bcrypt.hashSync("uezer123", 10),
      speciality: {
        connect: {
          name: "Fullstack",
        },
      },
    },
  })

  // Criando um pedido (order)
  const order = await prisma.order.create({
    data: {
      title: "Order",
      description: "Description",
      client: {
        connect: {
          id: client.id,
        },
      },
      uezer: {
        connect: {
          id: uezer.id,
        },
      },
      speciality: {
        connect: {
          name: "Fullstack",
        },
      },
    },
  })
  // Criando múltiplos pedidos (orders)
  const ordersData = [
    {
      title: "Order 1",
      description: "Description 1",
      clientId: client.id,
      uezerId: uezer.id,
      specialityName: "Fullstack",
    },
    {
      title: "Order 2",
      description: "Description 2",
      clientId: client.id,
      uezerId: uezer.id,
      specialityName: "Frontend",
    },
    {
      title: "Order 3",
      description: "Description 3",
      clientId: client.id,
      uezerId: uezer.id,
      specialityName: "Backend",
    },
  ]

  for (const orderData of ordersData) {
    await prisma.order.create({
      data: {
        title: orderData.title,
        description: orderData.description,
        client: {
          connect: {
            id: orderData.clientId,
          },
        },
        uezer: {
          connect: {
            id: orderData.uezerId,
          },
        },
        speciality: {
          connect: {
            name: orderData.specialityName,
          },
        },
      },
    })
  }
  // Criando pedidos (orders) com e sem uezer
  const mixedOrdersData = [
    {
      title: "Order 4",
      description: "Description 4",
      clientId: client.id,
      uezerId: uezer.id,
      specialityName: "Games",
    },
    {
      title: "Order 5",
      description: "Description 5",
      clientId: client.id,
      uezerId: null,
      specialityName: "Mobile",
    },
    {
      title: "Order 6",
      description: "Description 6",
      clientId: client.id,
      uezerId: uezer.id,
      specialityName: "Web",
    },
    {
      title: "Order 7",
      description: "Description 7",
      clientId: client.id,
      uezerId: null,
      specialityName: "Criação de logo",
    },
  ]

  for (const orderData of mixedOrdersData) {
    await prisma.order.create({
      data: {
        title: orderData.title,
        description: orderData.description,
        client: {
          connect: {
            id: orderData.clientId,
          },
        },
        uezer: orderData.uezerId
          ? {
              connect: {
                id: orderData.uezerId,
              },
            }
          : undefined,
        speciality: {
          connect: {
            name: orderData.specialityName,
          },
        },
      },
    })
  }

  console.log(client, uezer, order)
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
