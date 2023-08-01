const mysql = require('mysql2');

require('dotenv').config();

// Configuração da conexão com o banco de dados MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'uezdb'
});

module.exports = connection;
