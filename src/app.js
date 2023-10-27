const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());

// Configurando o CORS para permitir acesso apenas a partir do domínio uezcompany.com
const corsOptions = {
  origin: 'https://uezcompany.com',
  optionsSuccessStatus: 200, // Algumas configurações adicionais, se necessário
};

app.use(cors(corsOptions));

const clientesRoutes = require('./routes/clientes/clientesRoutes');
const uzersRoutes = require('./routes/uzers/uzersRoutes');
const funcionariosRoutes = require('./routes/funcionarios/funcionariosRoutes');
const servicosRoutes = require('./routes/servicos/servicosRoutes');
const authRoutes = require('./routes/auth/authRoutes');
const userRoutes = require('./routes/userRoutes');
const pedidosRoutes = require('./routes/pedidos/pedidosRoutes');

app.use(clientesRoutes);
app.use(uzersRoutes);
app.use(funcionariosRoutes);
app.use(servicosRoutes);
app.use(pedidosRoutes);
app.use(authRoutes);
app.use(userRoutes);

module.exports = app;
