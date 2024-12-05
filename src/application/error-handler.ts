import type { FastifyInstance } from "fastify"
import { ClientError } from "./errors/ClientError"
import { ZodError } from "zod"

type FastifyErrorHandler = FastifyInstance["errorHandler"]

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Invalid Input",
      errors: error.flatten().fieldErrors,
    })
  }

  if (error instanceof ClientError) {
    return reply.status(400).send({ message: error.message })
  }

  return reply.status(500).send({ message: "Internal server error" })
}
