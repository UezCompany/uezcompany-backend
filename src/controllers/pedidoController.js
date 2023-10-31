const pedidoModel = require('../models/pedidoModel')

const PedidoController = {
    getAllPedidos: async (req, res) => {
        try {
            const pedidos = await pedidoModel.getAllPedidos()
            res.status(200).json(pedidos)
        } catch (error) {
            console.error('Erro ao obter pedidos: ' + error.stack)
            res.status(500).json({ message: 'Erro ao obter os pedidos' })
        }
    },
    getActivePedidos: async (req, res) => {
        try {
            const pedidos = await pedidoModel.getActivePedidos()
            res.status(200).json(pedidos)
        } catch (error) {
            console.error('Erro ao obter pedidos: ' + error.stack)
            res.status(500).json({ message: 'Erro ao obter os pedidos disponiveis' })
        }
    },
    getRespectivePedidos: async (req, res) => {
        console.log(req.body.nomeServico)
        try {
            const pedidos = await pedidoModel.getRespectivePedidos(req.body.nomeServico)
            res.status(200).json(pedidos)
        } catch (error) {
            console.error('Erro ao obter pedidos: ' + error.stack)
            res.status(500).json({ message: 'Erro ao obter os pedidos disponiveis' })
        }
    },
    createPedido: async (req, res) => {
        const { tipo, categoriaServico, nomeServico, descricao, idCliente, valor, dataCriacao, tituloPedido } = req.body
        const pedidoData = {
            tipo: tipo,
            _categoriaServico: categoriaServico,
            _servico: nomeServico,
            descricao: descricao,
            _id_cliente: idCliente,
            valor: valor,
            dataCriacao: dataCriacao,
            titulo: tituloPedido
        }
        console.log("CREATEPEDIDOCONTROLLER", pedidoData)
        try {
            const pedido = await pedidoModel.createPedido(pedidoData)
            if (pedido.errors) {
                return res.status(400).json(pedido.errors)
            }
            res.status(201).json({ message: 'Pedido criado com sucesso', pedido })
        } catch (error) {
            console.error('Erro ao criar pedido: ' + error.stack)
            res.status(500).json({ message: 'Erro ao criar pedido' })
        }
    },
    assignUzerToPedido: async (req, res) => {
        const { id: idPedido } = req.params
        const { idUzer } = req.body

        try {
            const pedido = await pedidoModel.updatePedido(idPedido, { _id_uzer: idUzer, status: 'Esperando finalização', disponivel: false })
        } catch (error) {
            console.error('Erro ao atribuir uzer ao pedido: ' + error.stack)
            res.status(500).json({ message: 'Erro ao atribuir uzer ao pedido' })
        }
    },
    deletePedido: async (req, res) => {
        const { id } = req.params
        try {
            const pedido = await pedidoModel.deletePedido(id)
            res.status(200).json(pedido)
        } catch (error) {
            console.error('Erro ao deletar pedido: ' + error.stack)
            res.status(500).json({ message: 'Erro ao deletar pedido' })
        }
    }
}

module.exports = PedidoController