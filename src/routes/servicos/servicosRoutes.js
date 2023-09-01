const express = require('express');
const router = express.Router();
const { getAllServicos, getServicoById, createServico, deleteServico } = require('../../controllers/servicoController');
const { validateCreateServicoBody } = require('../../middleware/validateMiddlewares');
const validateJWT = require('../../middleware/authMiddleware');

// router.get('/servicos', validateJWT, getAllClientes);
// router.get('/servicos/:id', validateJWT, getClienteById);
router.get('/servicos', getAllServicos);
router.get('/servicos/:id', getServicoById);

router.post('/servicos', validateCreateServicoBody, createServico);

router.delete('/servicos/:id', deleteServico);
// Outras rotas para o modelo de Cliente

module.exports = router;
