import { CookieSerializeOptions } from "@fastify/cookie"

export const defaultAuthTokenConfig: CookieSerializeOptions = {
  httpOnly: false,
  path: "/",
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  domain: ".uezcompany.com",
  maxAge: 60 * 60 * 24 * 14, // 2 semanas
}
