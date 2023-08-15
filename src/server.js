const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
const cors = require('cors');
app.use(cors());

const connection = require('./models/db');

const clientesRoutes = require('./routes/clientes/clientesRoutes');
app.use('/api', clientesRoutes); // Use /api como prefixo para todas as rotas de clientes

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
