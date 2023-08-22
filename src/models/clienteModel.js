const Cliente = require('./Schemas/Cliente')

const ClienteModel = {
  getAllClientes: () => {
    return new Promise(async (resolve, reject) => {
      const clientes = await Cliente.find({});
      resolve(clientes);

    });
  },
  getClienteById: (id) => {
    return new Promise((resolve, reject) => {
      Cliente.findById(id, (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      })
    });
  },
  getClienteByEmail: (email) => {
    return new Promise((resolve, reject) => {
      Cliente.findOne({ emailCliente: email }, (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },
  createCliente: (cliente) => {
    return new Promise((resolve, reject) => {
      Cliente.create(cliente, (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },
  updateCliente: (id, { emailCliente, cpfCliente, rgCliente, senhaCliente }) => {
    return new Promise((resolve, reject) => {
      Cliente.updateOne({ _id: id }, { emailCliente, cpfCliente, rgCliente, senhaCliente }, (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    })
  },
  deleteCliente: (id) => {
    return new Promise((resolve, reject) => {
      Cliente.deleteOne({ _id: id }, (error, results, fields) => {
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
