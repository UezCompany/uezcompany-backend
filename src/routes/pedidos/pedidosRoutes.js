const express = require('express');
const router = express.Router();

const validateJWT = require('../../middleware/authMiddleware')
const { getActivePedidos, createPedido, assignUzerToPedido } = require('../../controllers/pedidoController');
const { validateCreatePedidoBody } = require('../../middleware/validateMiddlewares');

router.get('/pedidos', getActivePedidos);

router.post('/create/pedido', validateJWT, validateCreatePedidoBody, createPedido);

router.put('/pedidos/:id', validateJWT, assignUzerToPedido);
// Outras rotas para o modelo de Cliente

module.exports = router;
