const UzerModel = require('../models/uzerModel')

const UzerController = {
    getAllUzers: async (req, res) => {
        try {
            const uzers = await UzerModel.getAllUzers()
            res.status(200).json(uzers)
        } catch (error) {
            console.error('Erro ao obter uzers: ' + error.stack)
            res.status(500).json({ message: 'Erro ao obter uzers' })
        }
    },
    getUzerById: async (req, res) => {
        const { id } = req.params
        try {
            const uzer = await UzerModel.getUzerById(id)
            if (uzer) {
                res.json(uzer)
            } else {
                res.status(404).json({ message: 'Uzer não encontrado' })
            }
        } catch (error) {
            console.error('Erro ao obter uzer por ID: ' + error.stack)
            res.status(500).json({ message: 'Erro ao obter uzer por ID' })
        }
    },
    createUzer: async (req, res) => {
        const { email, senha, CPF } = req.body
        try {
            // Verifica se o uzer já existe com base no email
            const existingUzer = await UzerModel.getUzerByEmail(email)
            if (existingUzer) {
                return res.status(400).json({ message: 'Ja existe um uzer com este email' })
            }

            // Verifica se o uzer já existe com base no CPF
            const existingUzerCPF = await UzerModel.getUzerByCpf(CPF)
            if (existingUzerCPF) {
                return res.status(400).json({ message: 'Ja existe um uzer com este CPF' })
            }

            const bcrypt = require('bcrypt')
            const saltRounds = 10

            // Gere o hash da senha
            const hash = await bcrypt.hash(senha, saltRounds)

            // Substitua a senha original pelo hash
            req.body.senha = hash

            const uzer = await UzerModel.createUzer(req.body)

            if (uzer.errors) {
                return res.status(400).json(uzer.errors)
            }

            res.status(201).json({ message: 'Uzer criado com sucesso', uzer })
        } catch (error) {
            console.error('Erro ao criar uzer: ' + error.stack)
            res.status(500).json({ message: 'Erro ao criar uzer' })
        }
    },
    updateUzer: async (req, res) => {
        const { id } = req.params
        try {
            const uzer = await UzerModel.updateUzer(id, req.body)
            res.status(200).json(uzer)
        } catch (error) {
            console.error('Erro ao atualizar uzer: ' + error.stack)
            res.status(500).json({ message: 'Erro ao atualizar uzer' })
        }
    },
    updateUzerPhoto: async (req, res) => {
        const { photoUrl } = req.body

        try {
            const uzer = await UzerModel.updateUzer(req.body.userId, req.body)
            res.status(200).json({ message: 'Imagem de perfil atualizada com sucesso', uzer, photoUrl })
        } catch (error) {
            console.error('Erro ao atualizar o uzer: ' + error.stack)
            res.status(500).json({ message: 'Erro ao atualizar o uzer' })
        }
    },
    deleteUzer: async (req, res) => {
        const { id } = req.params
        try {
            const uzer = await UzerModel.deleteUzer(id)
            res.status(200).json(uzer)
        } catch (error) {
            console.error('Erro ao deletar uzer: ' + error.stack)
            res.status(500).json({ message: 'Erro ao deletar uzer' })
        }
    },
}

module.exports = UzerController