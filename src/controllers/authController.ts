import ClienteModel from "../models/Cliente"
import UzerModel from "../models/Uzer"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { Request, Response } from "express"

const AuthController = {
  login: async (req: Request, res: Response) => {
    const { email, senha, userType } = req.body

    try {
      let user: any = null

      if (userType === "cliente" || userType === "both") {
        user = await ClienteModel.getClienteByEmail(email)
      } else if (userType === "uzer" || userType === "both") {
        user = await UzerModel.getUzerByEmail(email)
      }

      if (!user) {
        return res.status(401).json({ message: "Usuário não encontrado" })
      }
      const senhaCorrespondente = user.senha

      await bcrypt.compare(senha, senhaCorrespondente, (err, bcryptResult) => {
        if (err) {
          console.error(err)
          return res.status(500).json({ message: "Erro interno." })
        } else if (bcryptResult) {
          const secret = process.env.SECRET || "default-secret"

          const token = jwt.sign({ id: user._id, tipo: userType }, secret, {
            expiresIn: "24h",
          })
          return res.status(200).json({ token, userType })
        } else {
          // A senha está incorreta
          return res.status(401).json({ message: "Credenciais inválidas" })
        }
      })
    } catch (error: any) {
      console.error("Erro ao fazer login: " + error.stack)
      res.status(500).json({ message: "Erro interno do servidor" })
    }
  },
  // loginFuncionario: async (req: Request, res: Response) => {
  //     const { idFuncionario, senhaFuncionario } = req.body

  //     try {
  //         let funcionario = await funcionarioModel.getFuncionarioById(idFuncionario)
  //         if (!funcionario) {
  //             return res.status(401).json({ message: 'Credenciais inválidas' })
  //         }

  //         if (senhaFuncionario !== funcionario.senhaFuncionario) {
  //             return res.status(401).json({ message: 'Credenciais inválidas' })
  //         }

  //         res.status(200).json({ nomeFuncionario: funcionario.nomeFuncionario, message: 'Login efetuado com sucesso' })
  //     } catch (error) {
  //         console.error('Erro ao fazer login: ' + error.stack)
  //         res.status(500).json({ message: 'Erro interno do servidor' })
  //     }
  // }
}

export default AuthController
