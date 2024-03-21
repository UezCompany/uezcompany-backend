import { prisma } from "@/lib/prisma"

const ServicoModel = {
  getAllPedidos: async () => {
    // const pedidos = await Pedido.find({}).catch((err) => console.error(err))
    const pedidos = await prisma.pedidos.findMany()
    return pedidos
  },
  getActivePedidos: async () => {
    // const pedidos = await Pedido.find({ disponivel: true }).catch((err) =>
    //   console.error(err),
    // )
    const pedidos = await prisma.pedidos.findMany({
      where: { disponivel: true },
    })
    return pedidos
  },
  getRespectivePedidos: async (servico: string) => {
    // const pedidos = await Pedido.find({ _servico: servico }).catch((err) =>
    //   console.error(err),
    // )
    const servicoId: any = await prisma.servicos.findUnique({
      where: { nome: servico },
      select: { id: true },
    })
    if (!servicoId) return
    const pedidos = await prisma.pedidos.findMany({ where: { servicoId } })
    return pedidos
  },
  createPedido: async (pedido: any) => {
    // const newPedido = await Pedido.create(pedido).catch((err) =>
    //   console.error(err),
    // )
    const newPedido = await prisma.pedidos.create({ data: pedido })
    return newPedido
  },
  updatePedido: async (id: string, updateData: any) => {
    // const updatePedido = await Pedido.updateOne({ _id: id }, updateData).catch(
    //   (err) => console.error(err),
    // )
    const updatePedido = await prisma.pedidos.update({
      where: { id },
      data: updateData,
    })
    return updatePedido
  },
  deletePedido: async (id: string) => {
    // const deletePedido = Pedido.updateOne(
    //   { _id: id },
    //   { disponivel: false, status: "Deletado" },
    // ).catch((err) => console.error(err))
    const deletePedido = await prisma.pedidos.update({
      where: { id },
      data: { disponivel: false, status: "DELETADO" },
    })
    return deletePedido
  },
  getPedidosByClienteId: async (id: string) => {
    // const pedidos = await Pedido.find({ _id_cliente: id }).catch((err) =>
    //   console.error(err),
    // )
    const pedidos = await prisma.pedidos.findMany({ where: { clienteId: id } })
    return pedidos
  },
  getPedidosByUzerId: async (id: string) => {
    // const pedidos = await Pedido.find({ _id_uzer: id }).catch((err) =>
    //   console.error(err),
    // )
    const pedidos = await prisma.pedidos.findMany({ where: { uzerId: id } })
    return pedidos
  },
  getPedidoById: async (id: string) => {
    // const pedido = await Pedido.findById(id).catch((err) => console.error(err))
    const pedido = await prisma.pedidos.findUnique({ where: { id } })
    return pedido
  },
  finishPedidoById: async (uzerId: string, id: string) => {
    // const pedido = await Pedido.updateOne(
    //   { _id: id },
    //   { status: "A avaliar", disponivel: false, _id_uzer: uzerId },
    // ).catch((err) => console.error(err))
    const pedido = await prisma.pedidos.update({
      where: { id },
      data: { status: "A AVALIAR", disponivel: false, uzerId },
    })
    return pedido
  },
  avaliarPedidoById: async (id: string, avaliacao: number | string) => {
    // const estaAvaliado = await Pedido.findOne({ _id: id, avaliado: true })
    const estaAvaliado = await prisma.pedidos.findUnique({
      where: { id, avaliado: true },
    })
    if (estaAvaliado) return null
    // await Pedido.updateOne(
    //   { _id: id },
    //   { avaliado: true, avaliacao: avaliacao, status: "Concluido" },
    // ).catch((err) => console.error(err))
    // const pedido = await Pedido.findOne({ _id: id })
    const pedido = await prisma.pedidos.update({
      where: { id },
      data: {
        avaliado: true,
        avaliacao: Number(avaliacao),
        status: "CONCLUIDO",
      },
    })
    return pedido
  },
}

export default ServicoModel
