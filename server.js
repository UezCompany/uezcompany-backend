const express = require('express');
const mysql = require('mysql2');

// Configuração da conexão com o banco de dados MySQL
const connection = mysql.createConnection({
  host: 'localhost', //host do banco de dados(onde ele ta)
  user: 'root', //usuario do banco de dados
  password: '', //senha do banco de dados
  database: 'uezdb' //nome do banco de dados
});

const app = express();

// Middleware para fazer o parsing do corpo das requisições
app.use(express.json());

// Rota de exemplo
app.get('/', (req, res) => {
  connection.query('SELECT * FROM tabela', (error, results, fields) => {
    if (error) {
      console.error('Erro ao executar consulta: ' + error.stack);
      return res.status(500).json({ message: 'Erro ao executar consulta' });
    }

    res.json(results);
  });
});



// Inicia o servidor na porta especificada
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
