const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const clientesRoutes = require('./routes/clientes/clientesRoutes');
const funcionariosRoutes = require('./routes/funcionarios/funcionariosRoutes');
const authRoutes = require('./routes/auth/authRoutes');

app.use('/api/clientes', clientesRoutes);
app.use('/api/funcionarios', funcionariosRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;
