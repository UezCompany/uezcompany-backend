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

  const teste = [
    {
      nome: "Fullstack",
      tipo: "ONLINE",
      idCategoria: "636727e9-7108-4f33-b6dc-fa9e63ac024d",
    },
    {
      nome: "Frontend",
      tipo: "ONLINE",
      idCategoria: "636727e9-7108-4f33-b6dc-fa9e63ac024d",
    },
    {
      nome: "Backend",
      tipo: "ONLINE",
      idCategoria: "636727e9-7108-4f33-b6dc-fa9e63ac024d",
    },
    {
      nome: "Games",
      tipo: "ONLINE",
      idCategoria: "636727e9-7108-4f33-b6dc-fa9e63ac024d",
    },
    {
      nome: "Mobile",
      tipo: "ONLINE",
      idCategoria: "636727e9-7108-4f33-b6dc-fa9e63ac024d",
    },
    {
      nome: "Engenharia de dados",
      tipo: "ONLINE",
      idCategoria: "636727e9-7108-4f33-b6dc-fa9e63ac024d",
    },
    {
      nome: "Web",
      tipo: "ONLINE",
      idCategoria: "636727e9-7108-4f33-b6dc-fa9e63ac024d",
    },
    {
      nome: "Criação de logo",
      tipo: "ONLINE",
      idCategoria: "265ef027-b4f8-475d-9975-a6b0caa90da9",
    },
    {
      nome: "Papelaria",
      tipo: "ONLINE",
      idCategoria: "265ef027-b4f8-475d-9975-a6b0caa90da9",
    },
    {
      nome: "Tipografia",
      tipo: "ONLINE",
      idCategoria: "265ef027-b4f8-475d-9975-a6b0caa90da9",
    },
    {
      nome: "Artes para redes sociais",
      tipo: "ONLINE",
      idCategoria: "265ef027-b4f8-475d-9975-a6b0caa90da9",
    },
    {
      nome: "Brand identity",
      tipo: "ONLINE",
      idCategoria: "265ef027-b4f8-475d-9975-a6b0caa90da9",
    },
    {
      nome: "Ilustração 2d/3d",
      tipo: "ONLINE",
      idCategoria: "265ef027-b4f8-475d-9975-a6b0caa90da9",
    },
    {
      nome: "UX/UI",
      tipo: "ONLINE",
      idCategoria: "265ef027-b4f8-475d-9975-a6b0caa90da9",
    },
    {
      nome: "Gestão de editoriais",
      tipo: "ONLINE",
      idCategoria: "31acc993-b76b-431a-a83a-81017a20e92f",
    },
    {
      nome: "Criação de conteúdo",
      tipo: "ONLINE",
      idCategoria: "31acc993-b76b-431a-a83a-81017a20e92f",
    },
    {
      nome: "Copywriter",
      tipo: "ONLINE",
      idCategoria: "31acc993-b76b-431a-a83a-81017a20e92f",
    },
    {
      nome: "Gestão de tráfego pago",
      tipo: "ONLINE",
      idCategoria: "31acc993-b76b-431a-a83a-81017a20e92f",
    },
    {
      nome: "Gestão de comunidades",
      tipo: "ONLINE",
      idCategoria: "31acc993-b76b-431a-a83a-81017a20e92f",
    },
    {
      nome: "Interação e monitoramento",
      tipo: "ONLINE",
      idCategoria: "31acc993-b76b-431a-a83a-81017a20e92f",
    },
    {
      nome: "Relatório e análises",
      tipo: "ONLINE",
      idCategoria: "31acc993-b76b-431a-a83a-81017a20e92f",
    },
    {
      nome: "Edição de vídeos",
      tipo: "ONLINE",
      idCategoria: "3737fb7c-5234-469c-8ddb-e9b01f3207fd",
    },
    {
      nome: "Roteirização",
      tipo: "ONLINE",
      idCategoria: "3737fb7c-5234-469c-8ddb-e9b01f3207fd",
    },
    {
      nome: "Narração",
      tipo: "ONLINE",
      idCategoria: "3737fb7c-5234-469c-8ddb-e9b01f3207fd",
    },
    {
      nome: "Animação 2D/3D",
      tipo: "ONLINE",
      idCategoria: "3737fb7c-5234-469c-8ddb-e9b01f3207fd",
    },
    {
      nome: "Operação de câmera",
      tipo: "ONLINE",
      idCategoria: "3737fb7c-5234-469c-8ddb-e9b01f3207fd",
    },
    {
      nome: "Operação de áudio",
      tipo: "ONLINE",
      idCategoria: "3737fb7c-5234-469c-8ddb-e9b01f3207fd",
    },
    {
      nome: "Operação de iluminação",
      tipo: "ONLINE",
      idCategoria: "3737fb7c-5234-469c-8ddb-e9b01f3207fd",
    },
  ]

  teste.forEach(async (servico) => {
    await prisma.servicos.create({
      data: {
        nome: servico.nome,
        tipo: "ONLINE",
        categoria: {
          connect: {
            id: servico.idCategoria,
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
