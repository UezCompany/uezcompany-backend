const mysql = require('mysql2');

require('dotenv').config();

// Configuração da conexão com o banco de dados MySQL
const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: 'uezdb'
});

module.exports = connection;
