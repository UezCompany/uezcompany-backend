import express from "express"
import cors from "cors"
import "dotenv/config"
import AllRoutes from "./routes"
import mongoose from "mongoose"

const app = express()
app.use(express.json())

const FRONTEND_DOMAIN = process.env.FRONTEND_DOMAIN || "*"

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.h3v2aaa.mongodb.net/?retryWrites=true&w=majority`,
    {
      dbName: "UEZDB",
    },
  )
  .then(() => {
    if (process.env.NODE_ENV !== "test") {
      console.log("Conexão com o banco de dados realizada com sucesso!")
    }
  })
  .catch((err) => {
    console.log(err)
  })

app.use(
  cors({
    origin: FRONTEND_DOMAIN,
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
)

app.get("/", (req, res) => {
  res.status(200).json("Server is running")
})

app.use(AllRoutes)

if (process.env.NODE_ENV !== "test") {
  console.log("CORS Habilitado. URL do domínio: " + FRONTEND_DOMAIN)
}

export default app
