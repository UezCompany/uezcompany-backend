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
  getClienteByEmail: (email) => {
    return new Promise((resolve, reject) => {
      connection.execute('SELECT * FROM cliente WHERE emailCliente = ?', [email], (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        console.log(results[0]);
        resolve(results[0]); 
      });
    });
  },
  createCliente: (cliente) => {
    return new Promise((resolve, reject) => {
      connection.execute('INSERT INTO cliente (emailCliente, cpfCliente, rgCliente, senhaCliente) VALUES (?, ?, ?, ?)',
        [cliente.emailCliente, cliente.cpfCliente, cliente.rgCliente, cliente.senhaCliente], (error, results, fields) => {
          if (error) {
            return reject(error);
          }
          resolve(results);
        });
    });
  },
  updateCliente: (id, { emailCliente, cpfCliente, rgCliente, senhaCliente }) => {
    return new Promise((resolve, reject) => {
      connection.execute('UPDATE cliente SET emailCliente = ?, cpfCliente = ?, rgCliente = ?, senhaCliente = ? WHERE idCliente = ?',
        [emailCliente, cpfCliente, rgCliente, senhaCliente, id],
        (error, results, fields) => {
          if (error) {
            return reject(error);
          }
          resolve(results[0]);
        })
    })
  },
  deleteCliente: (id) => {
    return new Promise((resolve, reject) => {
      connection.execute('DELETE FROM cliente WHERE idCliente = ?', [id], (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        resolve(results[0]);
      });
    });
  },
  // Outras funções para o modelo de Cliente
};

module.exports = ClienteModel;
