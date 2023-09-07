const servicoModel = require('../models/servicoModel');

const ServicoController = {
    getAllServicos: async (req, res) => {
        try {
            const servicos = await servicoModel.getAllServicos();
            res.status(200).json(servicos);
        } catch (error) {
            console.error('Erro ao obter servicos: ' + error.stack);
            res.status(500).json({ message: 'Erro ao obter servicos' });
        }
    },
    getServicoById: async (req, res) => {
        const { id } = req.params;
        try {
            const servico = await servicoModel.getServicoById(id);
            if (servico) {
                res.status(200).json(servico);
            } else {
                res.status(404).json({ message: 'Servico não encontrado' });
            }
        } catch (error) {
            console.error('Erro ao obter servico por ID: ' + error.stack);
            res.status(500).json({ message: 'Erro ao obter servico por ID' });
        }
    },
    createServico: async (req, res) => {
        const { nomeServico } = req.body;
        try {
            // Verifica se o servico já existe com base no nome
            const existingServico = await servicoModel.getServicoByName(nomeServico);
            if (existingServico) {
                console.log('Ja existe um servico com este nome');
                return res.status(400).json({ message: 'Ja existe um servico com este nome' });
            }

            const servico = await servicoModel.createServico(req.body);
            if (servico.errors) {
                console.log("Log: ", servico);
                return res.status(400).json(servico.errors);
            }
            res.status(201).json({ message: 'Servico criado com sucesso', servico });
        } catch (error) {
            console.error('Erro ao criar servico: ' + error.stack);
            res.status(500).json({ message: 'Erro ao criar servico' });
        }
    },
    deleteServico: async (req, res) => {
        const { id } = req.params;
        try {
            const servico = await servicoModel.deleteServico(id);
            res.status(200).json(servico);
        } catch (error) {
            console.error('Erro ao deletar servico: ' + error.stack);
            res.status(500).json({ message: 'Erro ao deletar servico' });
        }
    }
}

module.exports = ServicoController