import { FastifyInstance } from "fastify"

export default async function GetCategorias(app: FastifyInstance) {
  app.get("/categorias", async (request, reply) => {
    const { token } = request.cookies

    if (!token) {
      return reply.status(401).send({ message: "Token não informado" })
    }

    const decryptedToken = app.jwt.verify(token)

    if (!decryptedToken) {
      return reply.status(401).send({ message: "Token inválido ou expirado." })
    }

    const categorias = [
      { nomeCategoria: "DESIGN" },
      { nomeCategoria: "DESENVOLVIMENTO DE SOFTWARE" },
      { nomeCategoria: "MARKETING" },
      { nomeCategoria: "CONSULTORIA" },
      { nomeCategoria: "SERVIÇOS DE TI" },
      { nomeCategoria: "EDUCAÇÃO" },
      { nomeCategoria: "SAÚDE E BEM-ESTAR" },
      { nomeCategoria: "MANUTENÇÃO E REPAROS" },
      { nomeCategoria: "SERVIÇOS DOMÉSTICOS" },
      { nomeCategoria: "EVENTOS" },
    ]
    return reply.status(200).send(categorias)
  })
}
