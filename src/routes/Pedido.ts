import express from "express"
const router = express.Router()

import validateJWT from "@/middlewares/authMiddleware"
import ControllerPedido from "@/controllers/Pedido"
import validate from "@/middlewares/validate"
import UzerModel from "@/models/Uzer"


const { validateCreatePedidoBody } = validate

const {
  getActivePedidos,
  createPedido,
  assignUzerToPedido,
  getRespectivePedidos,
  getPedidosByClienteId,
  getPedidoById,
  getPedidosByUzerId,
  finishPedidoById,
  avaliarPedidoById,
} = ControllerPedido


router.get(
  "/pedidos",
  validateJWT,
  getRespectivePedidos,

  async (req, res, next) => {
    const { userId: id } = req.body

    try {
      const uzer = await UzerModel.getUzerById(id)

      if (uzer) {
        req.body.nomeServico = uzer.servicosPrestados[0].nomeServico
        next()
      } else {
        return res.status(404).json({ message: "Uzer não encontrado" })
      }
    } catch (error: any) {
      console.error("Erro ao obter uzer por ID: " + error.stack)
      return res.status(500).json({ message: "Erro ao obter uzer por ID" })
    }
  },
)

router.get("/pedidosAtivos", getActivePedidos)
router.get("/pedido/:id", getPedidoById)
router.get("/pedidos/cliente", validateJWT, getPedidosByClienteId)

router.get(
  "/pedidos/cliente/:id",
  validateJWT,
  getPedidosByClienteId,
  
  (req, res, next) => {
    const { id } = req.params
    req.body.userId = id
    next()
  },
)

router.get("/pedidos/uzer", validateJWT, getPedidosByUzerId)

router.post(
  "/create/pedido",
  validateJWT,
  validateCreatePedidoBody,
  createPedido,
)

router.put("/pedido/assignUzer/:id", validateJWT, assignUzerToPedido)

router.put("/pedido/finish/:id", validateJWT, finishPedidoById)

router.put("/pedido/avaliar/:id", validateJWT, avaliarPedidoById)

export default router
