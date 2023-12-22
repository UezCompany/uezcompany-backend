import app from "./app"
import mongoose from "mongoose"

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.h3v2aaa.mongodb.net/?retryWrites=true&w=majority`,
    {
      dbName: "UEZDB",
    },
  )
  .then(() => {
    console.log("Conexão com o banco de dados realizada com sucesso!")
  })
  .catch((err) => {
    console.log(err)
  })

const port = process.env.PORT || 3333
const host = process.env.HOST || "127.0.0.1"

app.listen(Number(port), host, () => {
  console.log(`%cServidor iniciado em http://${host}:${port}`, "color: green;")
})
