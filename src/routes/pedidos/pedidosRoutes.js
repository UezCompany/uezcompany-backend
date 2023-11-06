const express = require('express')
const router = express.Router()

const validateJWT = require('../../middleware/authMiddleware')
const { getActivePedidos, createPedido, assignUzerToPedido, getRespectivePedidos, getPedidosByClienteId } = require('../../controllers/pedidoController')
const { validateCreatePedidoBody } = require('../../middleware/validateMiddlewares')
const UzerModel = require('../../models/uzerModel')

router.get('/pedidos', validateJWT, async (req, res, next) => {
    const { userId: id } = req.body
    try {
        const uzer = await UzerModel.getUzerById(id)
        if (uzer) {
            req.body.nomeServico = uzer.servicosPrestados[0].nomeServico
            next()
        } else {
            return res.status(404).json({ message: 'Uzer não encontrado' })
        }
    } catch (error) {
        console.error('Erro ao obter uzer por ID: ' + error.stack)
        return res.status(500).json({ message: 'Erro ao obter uzer por ID' })
    }
}, getRespectivePedidos)
router.get('/pedidosAtivos', getActivePedidos)
router.get('/pedidos/cliente', validateJWT, getPedidosByClienteId)


router.post('/create/pedido', validateJWT, validateCreatePedidoBody, createPedido)

router.put('/pedidos/:id', validateJWT, assignUzerToPedido)
// Outras rotas para o modelo de Cliente

module.exports = router
