import { prisma } from "../src/infra/connection/prisma"

async function main() {
  console.log("Seeding production data...")
  // Criando as profissões
  const arrayOfProfessions = [
    "Programação",
    "Videomaking",
    "Design",
    "Social Media",
  ]

  // Criando as profissões no banco de dados
  const professionData = await prisma.profession.createMany({
    data: arrayOfProfessions.map((name: string) => ({ name })),
    skipDuplicates: true,
  })

  // Dados dos Especialidades
  const specialitiesData = [
    {
      name: "Fullstack",
      type: "ONLINE",
      professionName: arrayOfProfessions[0],
    },
    { name: "Frontend", type: "ONLINE", professionName: arrayOfProfessions[0] },
    { name: "Backend", type: "ONLINE", professionName: arrayOfProfessions[0] },
    { name: "Games", type: "ONLINE", professionName: arrayOfProfessions[0] },
    { name: "Mobile", type: "ONLINE", professionName: arrayOfProfessions[0] },
    {
      name: "Engenharia de dados",
      type: "ONLINE",
      professionName: arrayOfProfessions[0],
    },
    { name: "Web", type: "ONLINE", professionName: arrayOfProfessions[0] },
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
