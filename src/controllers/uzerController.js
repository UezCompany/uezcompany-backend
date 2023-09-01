const UzerModel = require('../models/uzerModel');

const UzerController = {
    getAllUzers: async (req, res) => {
        try {
            const uzers = await UzerModel.getAllUzers();
            res.status(200).json(uzers);
        } catch (error) {
            console.error('Erro ao obter uzers: ' + error.stack);
            res.status(500).json({ message: 'Erro ao obter uzers' });
        }
    },
    getUzerById: async (req, res) => {
        const { id } = req.params;
        try {
            const uzer = await UzerModel.getUzerById(id);
            if (uzer) {
                res.json(uzer);
            } else {
                res.status(404).json({ message: 'Uzer não encontrado' });
            }
        } catch (error) {
            console.error('Erro ao obter uzer por ID: ' + error.stack);
            res.status(500).json({ message: 'Erro ao obter uzer por ID' });
        }
    },
    createUzer: async (req, res) => {
        const { email } = req.body;
        try {
            // Verifica se o uzer já existe com base no email
            const existingUzer = await UzerModel.getUzerByEmail(email);
            if (existingUzer) {
                console.log('Ja existe um uzer com este email');
                return res.status(400).json({ message: 'Ja existe um uzer com este email' });
            }

            const bcrypt = require('bcrypt');
            const SECRET = process.env.SECRET2;

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(SECRET, req.body.senha, salt, (err, hash) => {
                    req.body.senhaCliente = hash;
                });
            })

            const uzer = await UzerModel.createUzer(req.body);
            
            if (uzer.errors) {
                console.log("Log: ", uzer);
                return res.status(400).json(uzer.errors);
            }

            res.status(201).json({ message: 'Uzer criado com sucesso', uzer });
        } catch (error) {
            console.error('Erro ao criar uzer: ' + error.stack);
            res.status(500).json({ message: 'Erro ao criar uzer' });
        }
    },
    updateUzer: async (req, res) => {
        const { id } = req.params;
        try {
            const uzer = await UzerModel.updateUzer(id, req.body);
            res.status(200).json(uzer);
        } catch (error) {
            console.error('Erro ao atualizar uzer: ' + error.stack);
            res.status(500).json({ message: 'Erro ao atualizar uzer' });
        }
    },
    deleteUzer: async (req, res) => {
        const { id } = req.params;
        try {
            const uzer = await UzerModel.deleteUzer(id);
            res.status(200).json(uzer);
        } catch (error) {
            console.error('Erro ao deletar uzer: ' + error.stack);
            res.status(500).json({ message: 'Erro ao deletar uzer' });
        }
    },
};

module.exports = UzerController