const Pedido = require('./Schemas/Pedido')

const PedidoModel = {
    getAllPedidos: async () => {
        const pedidos = await Pedido.find({}).catch(err => console.error(err))
        return pedidos
    },
    getActivePedidos: async () => {
        const pedidos = await Pedido.find({ disponivel: true }).catch(err => console.error(err))
        return pedidos
    },
    getRespectivePedidos: async (servico) => {
        console.log(servico)
        const pedidos = await Pedido.find({ _servico: servico }).catch(err => console.error(err))
        return pedidos
    },
    createPedido: async (pedido) => {
        const newPedido = await Pedido.create(pedido).catch(err => console.error(err))
        return newPedido
    },
    updatePedido: async (id, updateData) => {
        const updatePedido = await Pedido.updateOne({ _id: id }, updateData).catch(err => console.error(err))
        return updatePedido
    },
    deletePedido: async (id) => {
        const deletePedido = Pedido.updateOne({ _id: id }, { disponivel: false, status: 'Deletado' }).catch(err => console.error(err))
        return deletePedido
    },
    getPedidosByClienteId: async (id) => {
        const pedidos = await Pedido.find({ _id_cliente: id }).catch(err => console.error(err))
        return pedidos
    },
    getPedidosByUzerId: async (id) => {
        const pedidos = await Pedido.find({ _id_uzer: id }).catch(err => console.error(err))
        return pedidos
    },
    getPedidoById: async (id) => {
        const pedido = await Pedido.findById(id).catch(err => console.error(err))
        return pedido
    },
    finishPedidoById: async (uzerId, id) => {
        const pedido = await Pedido.updateOne({ _id: id }, { status: 'A avaliar', disponivel: false, _id_uzer: uzerId }).catch(err => console.error(err))
        return pedido
    },
    avaliarPedidoById: async (id, avaliacao) => {
        const estaAvaliado = await Pedido.findOne({ _id: id, avaliado: true })
        if (estaAvaliado) return null
        await Pedido.updateOne({ _id: id }, { avaliado: true, avaliacao: avaliacao, status: 'Concluido' }).catch(err => console.error(err))
        const pedido = await Pedido.findOne({ _id: id})
        return pedido
    }
}

module.exports = PedidoModel