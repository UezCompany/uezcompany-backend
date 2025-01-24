import { prisma } from "../src/infra/connection/prisma"
import bcrypt from "bcrypt"

export async function main() {
  console.log("Cleaning database...")

  // Deletando todos os registros das tabelas relevantes
  await prisma.portfolio.deleteMany({})
  await prisma.notification.deleteMany({})
  await prisma.user.deleteMany({})
  await prisma.speciality.deleteMany({})
  await prisma.profession.deleteMany({})
  await prisma.order.deleteMany({})

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
      name: "Anna Julia Alexandre Guimarães",
      birth_date: "2006-02-06",
      username: "cliente",
      email: "cliente@gmail.com",
      usertype: "CLIENT",
      password: bcrypt.hashSync("cliente123", 10),
    },
  })

  // Criando um usuário uezer
  const uezer = await prisma.user.create({
    data: {
      name: "João David de Oliveira Carneiro",
      birth_date: "2006-08-11",
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
      title: "Desenvolvimento de Aplicativo",
      description:
        "Desenvolvimento de um aplicativo móvel para gerenciamento de tarefas pessoais. O aplicativo deve permitir adicionar, editar e excluir tarefas, além de definir lembretes e prioridades para cada tarefa.",
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
      title: "Logo para café boutique",
      description:
        'Estou abrindo um café chamado "Doce Aroma" e preciso de um logotipo único. As cores principais devem ser bege, marrom e dourado, para transmitir sofisticação. Gostaria de receber os códigos das cores, fontes e todo o material necessário para aplicar a marca em diferentes lugares.',
      clientId: client.id,
      uezerId: null,
      specialityName: "Criação de logo",
    },
    {
      title: "E-commerce para loja de roupas",
      description:
        "Preciso de um site moderno para minha loja de roupas online, chamada 'Trend Fashion'. Deve incluir uma página inicial atraente, catálogo de produtos, carrinho de compras e integração com meios de pagamento. O design precisa ser clean e responsivo.",
      clientId: client.id,
      uezerId: null,
      specialityName: "Frontend",
    },
    {
      title: "Jogo educativo para crianças",
      description:
        "Estou procurando alguém para desenvolver um jogo educativo para crianças de 6 a 10 anos. O jogo deve ensinar matemática básica de forma divertida e interativa. Seria ótimo se o design fosse colorido e amigável para crianças.",
      clientId: client.id,
      uezerId: uezer.id,
      specialityName: "Games",
    },
    {
      title: "Aplicativo de agenda médica",
      description:
        "Preciso de um aplicativo mobile onde médicos e pacientes possam agendar consultas de forma fácil. Deve ter login para médicos e pacientes, lista de horários disponíveis e notificações automáticas.",
      clientId: client.id,
      uezerId: null,
      specialityName: "Mobile",
    },
    {
      title: "Landing page para evento",
      description:
        "Estou organizando um evento de tecnologia chamado 'TechX' e preciso de uma landing page atrativa para capturar inscrições. A página deve conter informações sobre o evento, formulário de inscrição e design moderno.",
      clientId: client.id,
      uezerId: null,
      specialityName: "Web",
    },
    {
      title: "Rebranding para loja de cosméticos",
      description:
        'Minha loja de cosméticos "Beleza Natural" precisa de um novo logotipo e identidade visual. Quero algo minimalista, com foco em tons pastel e elementos que remetam à natureza.',
      clientId: client.id,
      uezerId: null,
      specialityName: "Criação de logo",
    },
  ]

  for (const orderData of ordersData) {
    await prisma.order.create({
      data: {
        title: orderData.title,
        description: orderData.description,
        available: orderData.uezerId ? false : true,
        status: orderData.uezerId ? "IN_PROGRESS" : "OPEN",
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
