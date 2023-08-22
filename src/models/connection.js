const mongoose = require('mongoose')

require('dotenv').config()

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.h3v2aaa.mongodb.net/?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "UEZDB"
})
  .then(() => {
    console.log('Conexão com o banco de dados realizada com sucesso!')
  })
  .catch((err) => {
    console.log(err)
  })
module.exports = mongoose