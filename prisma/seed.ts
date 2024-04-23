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

  const servicesData = [
    {
      nome: "Fullstack",
      tipo: "ONLINE",
      idCategoria: "636727e9-7108-4f33-b6dc-fa9e63ac024d",
      servico: "Programação",
    },
    {
      nome: "Frontend",
      tipo: "ONLINE",
      idCategoria: "636727e9-7108-4f33-b6dc-fa9e63ac024d",
      servico: "Programação",
    },
    {
      nome: "Backend",
      tipo: "ONLINE",
      idCategoria: "636727e9-7108-4f33-b6dc-fa9e63ac024d",
      servico: "Programação",
    },
    {
      nome: "Games",
      tipo: "ONLINE",
      idCategoria: "636727e9-7108-4f33-b6dc-fa9e63ac024d",
      servico: "Programação",
    },
    {
      nome: "Mobile",
      tipo: "ONLINE",
      idCategoria: "636727e9-7108-4f33-b6dc-fa9e63ac024d",
      servico: "Programação",
    },
    {
      nome: "Engenharia de dados",
      tipo: "ONLINE",
      idCategoria: "636727e9-7108-4f33-b6dc-fa9e63ac024d",
      servico: "Programação",
    },
    {
      nome: "Web",
      tipo: "ONLINE",
      idCategoria: "636727e9-7108-4f33-b6dc-fa9e63ac024d",
      servico: "Programação",
    },
    {
      nome: "Criação de logo",
      tipo: "ONLINE",
      idCategoria: "265ef027-b4f8-475d-9975-a6b0caa90da9",
      servico: "Design",
    },
    {
      nome: "Papelaria",
      tipo: "ONLINE",
      idCategoria: "265ef027-b4f8-475d-9975-a6b0caa90da9",
      servico: "Design",
    },
    {
      nome: "Tipografia",
      tipo: "ONLINE",
      idCategoria: "265ef027-b4f8-475d-9975-a6b0caa90da9",
      servico: "Design",
    },
    {
      nome: "Artes para redes sociais",
      tipo: "ONLINE",
      idCategoria: "265ef027-b4f8-475d-9975-a6b0caa90da9",
      servico: "Design",
    },
    {
      nome: "Brand identity",
      tipo: "ONLINE",
      idCategoria: "265ef027-b4f8-475d-9975-a6b0caa90da9",
      servico: "Design",
    },
    {
      nome: "Ilustração 2d/3d",
      tipo: "ONLINE",
      idCategoria: "265ef027-b4f8-475d-9975-a6b0caa90da9",
      servico: "Design",
    },
    {
      nome: "UX/UI",
      tipo: "ONLINE",
      idCategoria: "265ef027-b4f8-475d-9975-a6b0caa90da9",
      servico: "Design",
    },
    {
      nome: "Gestão de editoriais",
      tipo: "ONLINE",
      idCategoria: "31acc993-b76b-431a-a83a-81017a20e92f",
      servico: "Social Media",
    },
    {
      nome: "Criação de conteúdo",
      tipo: "ONLINE",
      idCategoria: "31acc993-b76b-431a-a83a-81017a20e92f",
      servico: "Social Media",
    },
    {
      nome: "Copywriter",
      tipo: "ONLINE",
      idCategoria: "31acc993-b76b-431a-a83a-81017a20e92f",
      servico: "Social Media",
    },
    {
      nome: "Gestão de tráfego pago",
      tipo: "ONLINE",
      idCategoria: "31acc993-b76b-431a-a83a-81017a20e92f",
      servico: "Social Media",
    },
    {
      nome: "Gestão de comunidades",
      tipo: "ONLINE",
      idCategoria: "31acc993-b76b-431a-a83a-81017a20e92f",
      servico: "Social Media",
    },
    {
      nome: "Interação e monitoramento",
      tipo: "ONLINE",
      idCategoria: "31acc993-b76b-431a-a83a-81017a20e92f",
      servico: "Social Media",
    },
    {
      nome: "Relatório e análises",
      tipo: "ONLINE",
      idCategoria: "31acc993-b76b-431a-a83a-81017a20e92f",
      servico: "Social Media",
    },
    {
      nome: "Edição de vídeos",
      tipo: "ONLINE",
      servico: "Videomaking",
    },
    {
      nome: "Roteirização",
      tipo: "ONLINE",
      servico: "Videomaking",
    },
    {
      nome: "Narração",
      tipo: "ONLINE",
      servico: "Videomaking",
    },
    {
      nome: "Animação 2D/3D",
      tipo: "ONLINE",
      servico: "Videomaking",
    },
    {
      nome: "Operação de câmera",
      tipo: "ONLINE",
      servico: "Videomaking",
    },
    {
      nome: "Operação de áudio",
      tipo: "ONLINE",
      servico: "Videomaking",
    },
    {
      nome: "Operação de iluminação",
      tipo: "ONLINE",
      servico: "Videomaking",
    },
  ]

  servicesData.forEach(async (servico) => {
    await prisma.servicos.create({
      data: {
        nome: servico.nome,
        tipo: "ONLINE",
        categoria: {
          connect: {
            nome: servico.servico,
          },
        },
      },
    })
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
