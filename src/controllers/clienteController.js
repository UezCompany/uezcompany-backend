const ClienteModel = require('../models/clienteModel');
const jwt = require('jsonwebtoken');

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
        const { emailCliente } = req.body;
        try {
            // Verifica se o cliente já existe com base no email
            const existingCliente = await ClienteModel.getClienteByEmail(emailCliente);
            if (existingCliente) {
                return res.status(400).json({ message: 'Cliente já cadastrado com este email' });
            }

            const cliente = await ClienteModel.createCliente(req.body);
            res.status(201).json(cliente);
        } catch (error) {
            console.error('Erro ao criar cliente: ' + error.stack);
            res.status(500).json({ message: 'Erro ao criar cliente' });
        }
    },
    updateCliente: async (req, res) => {
        const { id } = req.params;
        try {
            const cliente = await ClienteModel.updateCliente(id, req.body);
            res.status(200).json(cliente);
        } catch (error) {
            console.error('Erro ao atualizar cliente: ' + error.stack);
            res.status(500).json({ message: 'Erro ao atualizar cliente' });
        }
    },
    deleteCliente: async (req, res) => {
        const { id } = req.params;
        try {
            const cliente = await ClienteModel.deleteCliente(id);
            res.status(200).json(cliente);
        } catch (error) {
            console.error('Erro ao deletar cliente: ' + error.stack);
            res.status(500).json({ message: 'Erro ao deletar cliente' });
        }
    },

};

module.exports = ClienteController;
