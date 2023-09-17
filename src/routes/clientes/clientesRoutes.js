const express = require('express');
const router = express.Router();
const { getAllClientes, getClienteById, createCliente, updateCliente, deleteCliente } = require('../../controllers/clienteController');
const { validateBody, validateClienteRegisterBody } = require('../../middleware/validateMiddlewares');
const validateJWT = require('../../middleware/authMiddleware');

router.get('/clientes', validateJWT, getAllClientes);
router.get('/clientes/:id', validateJWT, getClienteById);

router.put('/clientes/:id', validateBody, updateCliente);

router.delete('/clientes/:id', deleteCliente);
// Outras rotas para o modelo de Cliente

module.exports = router;
