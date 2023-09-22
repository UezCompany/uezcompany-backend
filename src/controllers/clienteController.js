const ClienteModel = require('../models/clienteModel');

const ClienteController = {
    getAllClientes: async (req, res) => {
        try {
            const clientes = await ClienteModel.getAllClientes();
            res.status(200).json(clientes);
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
        const { email, senha, CPF } = req.body;
        try {
            // Verifica se o cliente já existe com base no email
            const existingCliente = await ClienteModel.getClienteByEmail(email);
            if (existingCliente) {
                return res.status(400).json({ message: 'Já existe um cliente com este email' });
            }

            // Verifica se o cliente já existe com base no CPF
            const existingClienteCPF = await ClienteModel.getClienteByCpf(CPF);
            if (existingClienteCPF) {
                return res.status(400).json({ message: 'Já existe um cliente com este CPF' });
            }

            const bcrypt = require('bcrypt');
            const saltRounds = 10;

            // Gere o hash da senha
            const hash = await bcrypt.hash(senha, saltRounds);

            // Substitua a senha original pelo hash
            req.body.senha = hash;

            const cliente = await ClienteModel.createCliente(req.body);

            if (cliente.errors) {
                return res.status(400).json(cliente.errors);
            }

            res.status(201).json({ message: 'Cliente criado com sucesso', cliente });
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
