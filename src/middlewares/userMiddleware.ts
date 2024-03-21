import ClienteModel from "@/models/Cliente"
import UzerModel from "@/models/Uzer"
import { Request, Response, NextFunction } from "express"
import Validate from "./validate"

const { validateClienteRegisterBody, validateUzerRegisterBody } = Validate

// Esse middleware verifica o tipo de usuário de acordo com o banco de dados
const getUserDataByDbMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userId, email } = req.body

  // Verifique se o email está presente na tabela Cliente
  const cliente = !userId
    ? await ClienteModel.getClienteByEmail(email)
    : await ClienteModel.getClienteById(userId)
  
  if (cliente) {
    req.body.userType = "cliente"
    req.body.clienteName = cliente.nome
    return next()
  }

  // Verifique se o email está presente na tabela Uzer
  const uzer = !userId
    ? await UzerModel.getUzerByEmail(email)
    : await UzerModel.getUzerById(userId)
    
  if (uzer) {
    req.body.userType = "uzer"
    req.body.uzerName = uzer.nome
    return next()
  }

  return res.status(401).json({ message: "Usuário não encontrado" })
}

// Esse middleware verifica o tipo de usuário, de acordo com o userType enviado no body da requisição, e encaminhar para a sua respectiva forma de validação
const getUserTypeMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userType } = req.body

  if (userType === "cliente") {
    await validateClienteRegisterBody(req, res, next)
  } else if (userType === "uzer") {
    await validateUzerRegisterBody(req, res, next)
  } else {
    return res.status(400).json({ message: "Tipo de usuário inválido" })
  }
}

export default {
  getUserDataByDbMiddleware,
  userTypeMiddleware: getUserTypeMiddleware,
}
