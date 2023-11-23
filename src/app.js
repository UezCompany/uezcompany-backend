const express = require('express')
const app = express()
const cors = require('cors')
const clientesRoutes = require('./routes/clientes/clientesRoutes')
const uzersRoutes = require('./routes/uzers/uzersRoutes')
const funcionariosRoutes = require('./routes/funcionarios/funcionariosRoutes')
const servicosRoutes = require('./routes/servicos/servicosRoutes')
const authRoutes = require('./routes/auth/authRoutes')
const userRoutes = require('./routes/userRoutes')
const pedidosRoutes = require('./routes/pedidos/pedidosRoutes')
const chatRoutes = require('./routes/chatRoutes')
const notificationsRoutes = require('./routes/notificationsRoutes')

app.use(express.json())

const FRONTEND_DOMAIN = process.env.FRONTEND_DOMAIN || "*"

// Configurando o CORS para permitir acesso apenas a partir do domínio uezcompany.com
const corsOptions = {
  origin: FRONTEND_DOMAIN,
  optionsSuccessStatus: 200, // Algumas configurações adicionais, se necessário
}

app.use(cors(corsOptions)) // Usar o middleware cors corretamente
console.log("CORS Habilitado. URL do domínio: " + corsOptions.origin)

app.use(clientesRoutes)
app.use(uzersRoutes)
app.use(funcionariosRoutes)
app.use(servicosRoutes)
app.use(pedidosRoutes)
app.use(authRoutes)
app.use(userRoutes)
app.use(chatRoutes)
app.use(notificationsRoutes)

module.exports = app
