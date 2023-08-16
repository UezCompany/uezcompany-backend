const connection = require('./db');

const UzerModel = {
  getAllUzers: () => {
    return new Promise((resolve, reject) => {
      connection.execute('SELECT * FROM uzer', (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },
  getUzerById: (id) => {
    return new Promise((resolve, reject) => {
      connection.execute('SELECT * FROM uzer WHERE idUzer = ?', [id], (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        resolve(results[0]); // Retorna o primeiro resultado ou null
      });
    });
  },
  getUzerByEmail: (email) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM uzer WHERE emailUzer = ?', [email], (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        resolve(results[0]); // Retorna o primeiro resultado ou null
      });
    });
  },
  createUzer: (uzer) => {
    return new Promise((resolve, reject) => {
      connection.execute('INSERT INTO uzer (emailUzer, cpfUzer, rgUzer, senhaUzer) VALUES (?, ?, ?, ?)',
        [uzer.emailUzer, uzer.cpfUzer, uzer.rgUzer, uzer.senhaUzer], (error, results, fields) => {
          if (error) {
            return reject(error);
          }
          resolve(results[0]);
        });
    });
  },
  updateUzer: (id, { emailUzer, cpfUzer, rgUzer, senhaUzer }) => {
    return new Promise((resolve, reject) => {
      connection.execute('UPDATE uzer SET emailUzer = ?, cpfUzer = ?, rgUzer = ?, senhaUzer = ? WHERE idUzer = ?',
        [emailUzer, cpfUzer, rgUzer, senhaUzer, id],
        (error, results, fields) => {
          if (error) {
            return reject(error);
          }
          resolve(results[0]);
        })
    })
  },
  deleteUzer: (id) => {
    return new Promise((resolve, reject) => {
      connection.execute('DELETE FROM uzer WHERE idUzer = ?', [id], (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        resolve(results[0]);
      });
    });
  },
  // Outras funções para o modelo de Uzer
};

module.exports = UzerModel;
