import { env } from "../env"
import server from "./server"

const port = Number(env.PORT) || 3333
const host = env.HOST

server.listen({ port, host }).then(async () => {
  console.log(`Servidor iniciado em http://${host}:${port}`)
})
