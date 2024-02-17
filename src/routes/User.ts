import express from "express"
const router = express.Router()
import authMiddleware from "@/middlewares/authMiddleware"

import ClienteModel from "@/models/Cliente"
import UzerModel from "@/models/Uzer"

import userMiddlewares from "@/middlewares/userMiddleware"

const { getUserDataByDbMiddleware } = userMiddlewares

router.get(
  "/users/me",
  authMiddleware,
  getUserDataByDbMiddleware,
  async (req, res) => {
    const { userId, userType } = req.body
    if (userType === "both") {
      try {
        const cliente = await ClienteModel.getClienteById(userId)
        const uzer = await UzerModel.getUzerById(userId)
        res.json({ clienteData: cliente, uzerData: uzer })
      } catch (error: any) {
        console.error("Erro ao obter o usuário pelo ID: " + error.stack)
        res.status(500).json({ message: "Erro ao obter o usuário pelo ID" })
      }
    } else if (userType === "cliente") {
      try {
        req.body.id = userId
        const cliente = await ClienteModel.getClienteById(userId)
        if (cliente) {
          return res.json(cliente)
        } else {
          return res.status(404).json({ message: "Cliente não encontrado" })
        }
      } catch (error: any) {
        console.error("Erro ao obter cliente por ID: " + error.stack)
        return res.status(500).json({ message: "Erro ao obter cliente por ID" })
      }
    } else if (userType === "uzer") {
      try {
        const uzer = await UzerModel.getUzerById(userId)
        if (uzer) {
          return res.json(uzer)
        } else {
          return res.status(404).json({ message: "Uzer não encontrado" })
        }
      } catch (error: any) {
        console.error("Erro ao obter uzer por ID: " + error.stack)
        return res.status(500).json({ message: "Erro ao obter uzer por ID" })
      }
    }
  },
)

router.post("/validate-email", (req, res) => {
  res.status(200).json({ message: `O e-mail ${req.body.email} é valido` })
})
router.post("/validate-username", (req, res) => {
  res.status(200).json({ message: `O username ${req.body.username} é valido` })
})
router.post(
  "/validate-jwt",
  (req, res, next) => {
    const token = req.body.token
    req.headers.authorization = `Bearer ${token}`
    next()
  },
  authMiddleware,
  (req, res) => {
    return res.status(200).json({
      message: `O Token JWT: ${req.body.token} é valido`,
      token: req.body.token,
    })
  },
)

export default router
