import app from "./server"

const port = process.env.PORT || 3333
const host = process.env.HOST || "127.0.0.1"

app.listen(Number(port), host, () => {
  console.log(`%cServidor iniciado em http://${host}:${port}`, "color: green;")
})
