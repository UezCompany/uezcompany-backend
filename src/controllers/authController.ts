import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { Request, Response } from "express"
import { z } from "zod"
import getUserDataByEmail from "@/functions/getUserDataByEmail"

const AuthController = {
  login: async (req: Request, res: Response) => {
    try {
      const loginBody = z.object({
        email: z.string().email(),
        senha: z.string(),
      })
      const { email, senha } = loginBody.parse(req.body)

      try {
        const user = await getUserDataByEmail(email)

        if (!user) {
          return res.status(401).json({ message: "Usuário não encontrado" })
        }

        const { tipoUsuario, senha: senhaCorrespondente } = user

        bcrypt.compare(senha, senhaCorrespondente, (err, bcryptResult) => {
          if (err) {
            console.error(err)
            return res.status(500).json({ message: "Erro interno." })
          } else if (bcryptResult) {
            const secret = process.env.SECRET || "default-secret"

            const token = jwt.sign({ id: user.id, tipo: tipoUsuario }, secret, {
              expiresIn: "24h",
            })
            return res.status(200).json({ token, tipoUsuario })
          } else {
            // A senha está incorreta
            return res.status(401).json({ message: "Credenciais inválidas" })
          }
        })
      } catch (error: any) {
        console.error("Erro ao fazer login: " + error.stack)
        res.status(500).json({ message: "Erro interno do servidor" })
      }
    } catch (err) {
      res.status(400).json({ message: "Corpo da requisição inválido" })
    }
  },
}

export default AuthController
