const Uzer = require('./Schemas/Uzer');

const UzerModel = {
  getAllUzers: () => {
    return new Promise((resolve, reject) => {
      Uzer.find({}, (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },
  getUzerById: (id) => {
    return new Promise((resolve, reject) => {
      Uzer.findById(id, (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },
  getUzerByEmail: (email) => {
    return new Promise((resolve, reject) => {
      Uzer.findOne({ emailUzer: email }, (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },
  createUzer: (uzer) => {
    return new Promise((resolve, reject) => {
      Uzer.create(uzer, (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },
  updateUzer: (id, { emailUzer, cpfUzer, rgUzer, senhaUzer }) => {
    return new Promise((resolve, reject) => {
      Uzer.updateOne({ _id: id }, { emailUzer, cpfUzer, rgUzer, senhaUzer }, (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    })
  },
  deleteUzer: (id) => {
    return new Promise((resolve, reject) => {
      Uzer.deleteOne({ _id: id }, (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },
  // Outras funções para o modelo de Uzer
};

module.exports = UzerModel;
