const express = require('express');
const router = express.Router();
const { getAllFuncionarios, getFuncionarioById, createFuncionario } = require('../../controllers/funcionarioController');

router.get('/funcionarios', getAllFuncionarios);
router.get('/funcionarios/:id', getFuncionarioById);
router.post('/funcionarios', createFuncionario);

// Outras rotas para o modelo de Funcionario

module.exports = router;
