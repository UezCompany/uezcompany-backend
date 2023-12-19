import app from "./app"

const port = process.env.PORT || 3333
const host = process.env.HOST || "0.0.0.0"

app.listen(Number(port), host, () => {
  console.log(`Servidor iniciado em http://${host}:${port}`)
})
