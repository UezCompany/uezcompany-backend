import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers
  if (!authorization) {
    return res.status(401).json({ message: "Token não informado" })
  }
  const [, token] = authorization.split(" ") // Extrai o token da string com "Bearer"
  try {
    const { id } = jwt.verify(token, process.env.SECRET || "") as {
      id: string
    }

    req.body.userId = id

    return next()
  } catch (error) {
    return res.status(401).json({ message: "Token inválido ou expirado." })
  }
}

export default validateJWT
