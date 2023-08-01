const express = require('express');
const router = express.Router();

module.exports = (connection) => {
  // Rota de exemplo
  router.get('/', (req, res) => {
    connection.query('SELECT * FROM tabela', (error, results, fields) => {
      if (error) {
        console.error('Erro ao executar consulta: ' + error.stack);
        return res.status(500).json({ message: 'Erro ao executar consulta' });
      }

      res.json(results);
    });
  });

  return router;
};
