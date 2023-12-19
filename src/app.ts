import express from "express"
import cors from "cors"
import "dotenv/config"
import AllRoutes from "./routes"

const app = express()
app.use(express.json())

const FRONTEND_DOMAIN = process.env.FRONTEND_DOMAIN || "*"

app.use(
  cors({
    origin: FRONTEND_DOMAIN,
    optionsSuccessStatus: 200,
  }),
)

app.use(AllRoutes)

console.log("CORS Habilitado. URL do domínio: " + FRONTEND_DOMAIN)

export default app
