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
    }
}

module.exports = PedidoModel