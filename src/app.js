const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const clientesRoutes = require('./routes/clientes/clientesRoutes');
const uzersRoutes = require('./routes/uzers/uzersRoutes');
const funcionariosRoutes = require('./routes/funcionarios/funcionariosRoutes');
const servicosRoutes = require('./routes/servicos/servicosRoutes');
const authRoutes = require('./routes/auth/authRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api', clientesRoutes);
app.use('/api', uzersRoutes);
app.use('/api', funcionariosRoutes);
app.use('/api', servicosRoutes);
app.use('/api', authRoutes);
app.use('/api', userRoutes)

module.exports = app;
