const app = require('./app');

const PORT = process.env.PORT || 3333;

const clientesRoutes = require('./routes/clientes/clientesRoutes');
app.use('/api', clientesRoutes); // Use /api como prefixo para todas as rotas de clientes

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
