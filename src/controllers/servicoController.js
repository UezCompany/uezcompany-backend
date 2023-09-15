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
    getServicoByCategoryName: async (req, res) => {
        const { categoria } = req.query;
        try {
            const servico = await servicoModel.getServicoByCategory(categoria);
            if (servico && servico.length > 0) {
                return res.status(200).json(servico);
            } else {
                return res.status(404).json({ message: 'Categoria não encontrada. Consulte as categorias disponíveis para consulta.' });
            }
        } catch (error) {
            console.error('Erro ao obter servico por categoria: ' + error.stack);
            res.status(500).json({ message: 'Erro ao obter servico por categoria' });
        }
    },
    createServico: async (req, res) => {
        console.log(req.body);
        const { nome } = req.body;
        try {
            // Verifica se o servico já existe com base no nome
            const existingServico = await servicoModel.getServicoByName(nome);
            console.log(existingServico);
            if (existingServico) {
                return res.status(400).json({ message: 'Ja existe um servico com este nome' });
            }

            const servico = await servicoModel.createServico(req.body);
            if (servico.errors) {
                return res.status(400).json(servico.errors);
            }
            console.log(servico);
            res.status(200).json({ message: 'Servico criado com sucesso', servico });
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