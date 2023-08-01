// server.js
const express = require('express');
const app = express();
const port = 3000;

// Middleware para fazer o parsing do corpo das requisições
app.use(express.json());

// Importa a conexão com o banco de dados
const connection = require('./models/db');

// Importa as rotas
const routes = require('./routes')(connection);
app.use('/', routes);

// Inicia o servidor na porta especificada
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
