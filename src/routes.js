const express = require('express');
const router = express.Router();

module.exports = (connection) => {
  // Rota /clientes - GET
  router.get('/clientes', (req, res) => {
    connection.query('SELECT * FROM cliente', (error, results, fields) => {
      if (error) {
        console.error('Erro ao executar consulta: ' + error.stack);
        return res.status(500).json({ message: 'Erro ao executar consulta' });
      }

      res.json(results);
    });
  });

  router.get('/clientes/:id', (req, res) => {
    connection.query('SELECT * FROM cliente WHERE idCliente = ?', [req.params.id], (error, results, fields) => {
      if (error) {
        console.error('Erro ao executar consulta: ' + error.stack);
        return res.status(500).json({ message: 'Erro ao executar consulta' });
      }

      res.json(results);
    })
  });


  // Rota /clientes - POST
  router.post('/clientes', (req, res) => {
    connection.query('INSERT INTO cliente(emailCliente, senhaCliente, cpfCliente, rgCliente) VALUES (?, ?, ?, ?)',
      [
        req.body.emailCliente,
        req.body.senhaCliente,
        req.body.cpfCliente,
        req.body.rgCliente,
      ],
      (error, results, fields) => {
        if (error) {
          console.error('Erro ao executar consulta: ' + error.stack);
          return res.status(500).json({ message: 'Erro ao executar consulta' });
        }

        res.json(results);
      })
  });


  // Rota /uzers = GET
  router.get('/uzers', (req, res) => {
    connection.query('SELECT * FROM uzers', (error, results, fields) => {
      if (error) {
        console.error('Erro ao executar consulta: ' + error.stack);
        return res.status(500).json({ message: 'Erro ao executar consulta' });
      }

      res.json(results);
    });
  });

  router.get('/uzers/:id', (req, res) => {
    connection.query('SELECT * FROM uzers WHERE idUzer = ?', [req.params.id], (error, results, fields) => {
      if (error) {
        console.error('Erro ao executar consulta: ' + error.stack);
        return res.status(500).json({ message: 'Erro ao executar consulta' });
      }

      res.json(results);
    })
  });

  // Rota /uzers = POST
  router.post('/uzers', (req, res) => {
    connection.query('INSERT INTO cliente(emailUzer, senhaUzer, cpfUzer, rgUzer) VALUES (?, ?, ?, ?)',
      [
        req.body.emailUzer,
        req.body.senhaUzer,
        req.body.cpfUzer,
        req.body.rgUzer,
      ],
      (error, results, fields) => {
        if (error) {
          console.error('Erro ao executar consulta: ' + error.stack);
          return res.status(500).json({ message: 'Erro ao executar consulta' });
        }

        res.json(results);
      })
  });


  return router;
};
