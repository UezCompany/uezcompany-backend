const app = require('./app');

const PORT = process.env.PORT || 3333;

const cors = require('cors');
app.use(cors());

const clientesRoutes = require('./routes/clientes/clientesRoutes');
app.use('/api', clientesRoutes); // Use /api como prefixo para todas as rotas de clientes

const authRoutes = require('./routes/auth/authRoutes');
app.use('/api', authRoutes); // Use /api como prefixo para todas as rotas de autorização

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
