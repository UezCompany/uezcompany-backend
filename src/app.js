const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const clientesRoutes = require('./routes/clientes/clientesRoutes');
const userRoutes = require('./routes/usuarios/usuariosRoutes');
const funcionariosRoutes = require('./routes/funcionarios/funcionariosRoutes');
const servicosRoutes = require('./routes/servicos/servicosRoutes');
const authRoutes = require('./routes/auth/authRoutes');

app.use('/api', clientesRoutes);
app.use('/api', userRoutes);
app.use('/api', funcionariosRoutes);
app.use('/api', servicosRoutes);
app.use('/api', authRoutes);

module.exports = app;
