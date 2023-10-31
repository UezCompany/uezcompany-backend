const express = require('express')
const router = express.Router()
const { getAllClientes, getClienteById, updateCliente, deleteCliente } = require('../../controllers/clienteController')
const { validateBody } = require('../../middleware/validateMiddlewares')
const validateJWT = require('../../middleware/authMiddleware')

router.get('/clientes', getAllClientes)
router.get('/clientes/:id', getClienteById)

router.put('/clientes/:id', validateJWT, validateBody, updateCliente)

router.delete('/clientes/:id', validateJWT, deleteCliente)
// Outras rotas para o modelo de Cliente

module.exports = router
