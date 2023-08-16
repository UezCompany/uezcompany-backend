const ClienteModel = require('../models/ClienteModel');

const ClienteController = {
    getAllClientes: async (req, res) => {
        try {
            const clientes = await ClienteModel.getAllClientes();
            res.json(clientes);
        } catch (error) {
            console.error('Erro ao obter clientes: ' + error.stack);
            res.status(500).json({ message: 'Erro ao obter clientes' });
        }
    },
    getClienteById: async (req, res) => {
        const { id } = req.params;
        try {
            const cliente = await ClienteModel.getClienteById(id);
            if (cliente) {
                res.json(cliente);
            } else {
                res.status(404).json({ message: 'Cliente não encontrado' });
            }
        } catch (error) {
            console.error('Erro ao obter cliente por ID: ' + error.stack);
            res.status(500).json({ message: 'Erro ao obter cliente por ID' });
        }
    },
    createCliente: async (req, res) => {
        try {
            const cliente = await ClienteModel.createCliente(req.body);
            res.status(201).json(cliente);
        } catch (error) {
            console.error('Erro ao criar cliente: ' + error.stack);
            res.status(500).json({ message: 'Erro ao criar cliente' });
        }
    },
};

module.exports = ClienteController;
