const connection = require('./db');

const ClienteModel = {
  getAllClientes: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM cliente', (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },
  getClienteById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM cliente WHERE idCliente = ?', [id], (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        resolve(results[0]); // Retorna o primeiro resultado ou null
      });
    });
  },
  // Outras funções para o modelo de Cliente
};

module.exports = ClienteModel;
