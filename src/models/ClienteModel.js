const connection = require('./db');

const ClienteModel = {
  getAllClientes: () => {
    return new Promise((resolve, reject) => {
      connection.execute('SELECT * FROM cliente', (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },
  getClienteById: (id) => {
    return new Promise((resolve, reject) => {
      connection.execute('SELECT * FROM cliente WHERE idCliente = ?', [id], (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        resolve(results[0]); // Retorna o primeiro resultado ou null
      });
    });
  },
  createCliente: (cliente) => {
    return new Promise((resolve, reject) => {
      connection.execute('INSERT INTO cliente (emailCliente, cpfCliente, rgCliente, senhaCliente) VALUES (?, ?, ?, ?)', [cliente.emailCliente, cliente.cpfCliente, cliente.rgCliente, cliente.senhaCliente], (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },
  // Outras funções para o modelo de Cliente
};

module.exports = ClienteModel;
