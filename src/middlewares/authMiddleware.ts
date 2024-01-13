import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import getUserDataById from "@/functions/getUserDataById"

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers
  if (!authorization) {
    return res.status(401).json({ message: "Token não informado" })
  }
  const [, token] = authorization.split(" ") // Extrai o token da string com "Bearer"
  try {
    const { id } = jwt.verify(token, process.env.SECRET ?? "") as {
      id: string
    }

    const user = await getUserDataById(id)

    if (!user) {
      return res.status(401).json({ message: "Token inválido ou expirado." })
    }

    const { ...loggedUser } = user

    // @ts-expect-error user propertie is not assignable by default
    req.user = loggedUser
    req.body.userId = id

    return next()
  } catch (error) {
    return res.status(401).json({ message: "Token inválido ou expirado." })
  }
}

export default authMiddleware
