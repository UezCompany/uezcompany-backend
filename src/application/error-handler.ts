import type { FastifyInstance } from "fastify"
import { ClientError } from "./errors/ClientError"
import { hasZodFastifySchemaValidationErrors } from "fastify-type-provider-zod"

type FastifyErrorHandler = FastifyInstance["errorHandler"]

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: "Invalid Input",
      errors: error.validation.map((err) => ({
        message: err.message,
        field: err.instancePath,
      })),
    })
  }

  if (error instanceof ClientError) {
    return reply.status(400).send({ message: error.message })
  }

  return reply.status(500).send({ message: "Internal server error", error })
}
