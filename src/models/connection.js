const mongoose = require('mongoose')

require('dotenv').config()

console.log(process.env.DB_USER)
console.log(process.env.DB_PASSWORD)

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.h3v2aaa.mongodb.net/?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})



mongoose.connection.once('open', () => {
  console.log('Conexão com o banco de dados realizada com sucesso!')
})

