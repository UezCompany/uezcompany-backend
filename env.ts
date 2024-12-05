import { z } from "zod"

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  SECRET: z.string(),
  PORT: z.string().default("3333"),
  HOST: z.string().default("localhost"),
  FRONTEND_DOMAIN: z.string().default("uezcompany.com"),
  AWS_ACCESS_KEY_ID: z.optional(z.string()),
  AWS_SECRET_ACCESS_KEY: z.optional(z.string()),
  AWS_REGION: z.optional(z.string()),
  AWS_SESSION_TOKEN: z.optional(z.string()),
  STRIPE_API_KEY: z.optional(z.string().min(1)),
})

export const env = envSchema.parse(process.env)
