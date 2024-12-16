import "fastify"

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => Promise<void>
  }

  interface FastifyRequest {
    user?: {
      id: string // ID do usuário
      iat?: number // Timestamp de emissão do token
      exp?: number // Timestamp de expiração do token
    }
  }
}
