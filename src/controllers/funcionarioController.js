const FuncionarioModel = require('../models/funcionarioModel')

const FuncionarioController = {
    getAllFuncionarios: async (req, res) => {
        try {
            const funcionarios = await FuncionarioModel.getAllFuncionarios()
            res.status(200).json(funcionarios)
        } catch (error) {
            console.error('Erro ao obter funcionarios: ' + error.stack)
            res.status(500).json({ message: 'Erro ao obter funcionarios' })
        }
    },
    getFuncionarioById: async (req, res) => {
        const { id } = req.params
        try {
            const funcionario = await FuncionarioModel.getFuncionarioById(id)
            if (funcionario) {
                res.json(funcionario)
            } else {
                res.status(404).json({ message: 'Funcionario não encontrado' })
            }
        } catch (error) {
            console.error('Erro ao obter funcionario por ID: ' + error.stack)
            res.status(500).json({ message: 'Erro ao obter funcionario por ID' })
        }
    },
    createFuncionario: async (req, res) => {
        const { emailFuncionario } = req.body
        try {
            // Verifica se o funcionario já existe com base no email
            const existingFuncionario = await FuncionarioModel.getFuncionarioByEmail(emailFuncionario)
            if (existingFuncionario) {
                return res.status(400).json({ message: 'Funcionario já cadastrado com este email' })
            }

            const funcionario = await FuncionarioModel.createFuncionario(req.body)
            res.status(201).json({ message: 'Funcionario criado com sucesso', funcionario })
        } catch (error) {
            console.error('Erro ao criar funcionario: ' + error.stack)
            res.status(500).json({ message: 'Erro ao criar funcionario' })
        }
    },
    updateFuncionario: async (req, res) => {
        const { id } = req.params
        try {
            const funcionario = await FuncionarioModel.updateFuncionario(id, req.body)
            res.status(200).json(funcionario)
        } catch (error) {
            console.error('Erro ao atualizar funcionario: ' + error.stack)
            res.status(500).json({ message: 'Erro ao atualizar funcionario' })
        }
    },
    deleteFuncionario: async (req, res) => {
        const { id } = req.params
        try {
            const funcionario = await FuncionarioModel.deleteFuncionario(id)
            res.status(200).json(funcionario)
        } catch (error) {
            console.error('Erro ao deletar funcionario: ' + error.stack)
            res.status(500).json({ message: 'Erro ao deletar funcionario' })
        }
    },

}

module.exports = FuncionarioController
