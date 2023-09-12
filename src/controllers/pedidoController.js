const pedidoModel = require('../models/pedidoModel');

const PedidoController = {
    getAllPedidos: async (req, res) => {
        try {
            const pedidos = await pedidoModel.getAllPedidos();
            res.status(200).json(pedidos);
        } catch (error) {
            console.error('Erro ao obter pedidos: ' + error.stack);
            res.status(500).json({ message: 'Erro ao obter pedidos' });
        }
    },
    createPedido: async (req, res) => {
        try {
            const pedido = await pedidoModel.createPedido(req.body);
            if (pedido.errors) {
                return res.status(400).json(pedido.errors);
            }
            res.status(201).json({ message: 'Pedido criado com sucesso', pedido });
        } catch (error) {
            console.error('Erro ao criar pedido: ' + error.stack);
            res.status(500).json({ message: 'Erro ao criar pedido' });
        }
    },
    deletePedido: async (req, res) => {
        const { id } = req.params;
        try {
            const pedido = await pedidoModel.deletePedido(id);
            res.status(200).json(pedido);
        } catch (error) {
            console.error('Erro ao deletar pedido: ' + error.stack);
            res.status(500).json({ message: 'Erro ao deletar pedido' });
        }
    }
}

module.exports = PedidoController