import express from "express"
import authController from "@/controllers/authController"
import ClienteController from "@/controllers/Cliente"
import UzerController from "@/controllers/Uzer"
import UserMiddleware from "@/middlewares/userMiddleware"
const { userTypeMiddleware } = UserMiddleware
const router = express.Router()

router.post("/register", userTypeMiddleware, (req, res) => {
  const { userType } = req.body

  if (userType === "cliente") {
    ClienteController.createCliente(req, res)
  } else if (userType === "uzer") {
    UzerController.createUzer(req, res)
  } else {
    res.json({ message: "Tipo de usuário inválido" }).status(400)
  }
})

router.post("/login", authController.login)

export default router
