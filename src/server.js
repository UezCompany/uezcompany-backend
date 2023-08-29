const app = require('./app');

const PORT = process.env.PORT || 3333;

const cors = require('cors');
app.use(cors());

const clientesRoutes = require('./routes/clientes/clientesRoutes');
app.use('/api', clientesRoutes); // Use /api como prefixo para todas as rotas de clientes

const funcionariosRoutes = require('./routes/funcionarios/funcionariosRoutes');
app.use('/api', funcionariosRoutes); // Use /api como prefixo para todas as rotas de funcionários

const authRoutes = require('./routes/auth/authRoutes');
app.use(authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
