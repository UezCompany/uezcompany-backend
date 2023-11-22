const pedidoModel = require('../models/pedidoModel')
const UzerModel = require('../models/uzerModel')

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
        const { idUzer, preco } = req.body

        try {
            const pedido = await pedidoModel.updatePedido(idPedido, { _id_uzer: idUzer, status: 'Em andamento', disponivel: false, valor: preco })
            res.status(200).json(pedido)
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
    },
    getPedidosByClienteId: async (req, res) => {
        const { userId } = req.body
        try {
            const pedidos = await pedidoModel.getPedidosByClienteId(userId)
            res.status(200).json(pedidos)
        } catch (error) {
            console.error('Erro ao obter pedidos pelo ID do cliente: ' + error.stack)
            res.status(500).json({ message: 'Erro ao obter pedidos pelo ID do cliente' })
        }
    },
    getPedidosByUzerId: async (req, res) => {
        const { userId } = req.body
        try {
            const pedidos = await pedidoModel.getPedidosByUzerId(userId)
            res.status(200).json(pedidos)
        } catch (error) {
            console.error('Erro ao obter pedidos pelo ID do uzer: ' + error.stack)
            res.status(500).json({ message: 'Erro ao obter pedidos pelo ID do uzer' })
        }
    },
    getPedidoById: async (req, res) => {
        const { id } = req.params
        try {
            const pedido = await pedidoModel.getPedidoById(id)
            res.status(200).json(pedido)
        } catch (error) {
            console.error('Erro ao obter pedido pelo ID: ' + error.stack)
            res.status(500).json({ message: 'Erro ao obter pedido pelo ID' })
        }
    },
    finishPedidoById: async (req, res) => {
        const { userId } = req.body
        const { id } = req.params
        try {
            const pedido = await pedidoModel.finishPedidoById(userId, id)
            res.status(200).json(pedido)
        } catch (error) {
            console.error('Erro ao finalizar pedido pelo ID: ' + error.stack)
            res.status(500).json({ message: 'Erro ao finalizar pedido pelo ID' })
        }
    },
    avaliarPedidoById: async (req, res) => {
        const { avaliacao } = req.body
        const { id } = req.params
        try {
            const pedido = await pedidoModel.avaliarPedidoById(id, avaliacao)
            if (pedido === null) {
                return res.status(404).json({ message: 'O pedido não foi encontrado, ou já foi avaliado' })
            }
            await UzerModel.avaliarUzer(pedido._id_uzer, avaliacao)
            res.status(200).json(pedido)
        } catch (error) {
            console.error('Erro ao avaliar pedido pelo ID: ' + error.stack)
            res.status(500).json({ message: 'Erro ao avaliar pedido pelo ID' })
        }
    }
}

module.exports = PedidoController