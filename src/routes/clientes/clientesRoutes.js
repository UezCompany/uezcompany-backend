const express = require('express');
const router = express.Router();
const ClienteController = require('../controllers/ClienteController');

router.get('/clientes', ClienteController.getAllClientes);
router.get('/clientes/:id', ClienteController.getClienteById);
// Outras rotas para o modelo de Cliente

module.exports = router;
