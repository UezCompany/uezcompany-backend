import { z } from "zod"

const envSchema = z.object({
  PORT: z.string().default("3333"),
  SECRET: z.string(),
  HOST: z.string().default("localhost"),
  FRONTEND_DOMAIN: z.string().default("uezcompany.com"),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_REGION: z.string(),
  DATABASE_URL: z.string().url(),
  STRIPE_API_KEY: z.string().min(1),
  AWS_SESSION_TOKEN: z.string().optional(),
})

export const env = envSchema.parse(process.env)
