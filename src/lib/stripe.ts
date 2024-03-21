import Stripe from "stripe"
import { env } from "../../env"

export const stripe = new Stripe(env.STRIPE_API_KEY, {
  apiVersion: "2023-10-16",
  appInfo: {
    name: "UEZ Company",
    version: "0.1.0",
  },
})
