const express = require('express');
const router = express.Router();
const { getAllServicos, getServicoById, getServicoByCategoryName, createServico, deleteServico } = require('../../controllers/servicoController');
const { validateCreateServicoBody } = require('../../middleware/validateMiddlewares');

const categorias = [
    { nomeCategoria: 'Design' },
    { nomeCategoria: 'Desenvolvimento de Software' },
    { nomeCategoria: 'Marketing' },
    { nomeCategoria: 'Consultoria' },
    { nomeCategoria: 'Serviços de TI' },
    { nomeCategoria: 'Educação' },
    { nomeCategoria: 'Saúde e Bem-estar' },
    { nomeCategoria: 'Manutenção e Reparos' },
    { nomeCategoria: 'Serviços Domésticos' },
    { nomeCategoria: 'Eventos' },
    { nomeCategoria: 'Outros' },
]

router.get('/servicos', getAllServicos);
router.get('/servicosPorCategoria', getServicoByCategoryName);

router.get('/servicos/:id', getServicoById);
router.get('/categorias', (req, res) => {
    res.status(200).json(categorias);
});

router.post('/servicos', validateCreateServicoBody, createServico);

router.delete('/servicos/:id', deleteServico);
// Outras rotas para o modelo de Cliente

module.exports = router;
