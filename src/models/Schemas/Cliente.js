const { Schema, model } = require('../connection');

const clienteSchema = new Schema({
    nomeCliente: {
        type: String,
        required: true
    },
    emailCliente: {
        type: String,
        required: true
    },
    cpfCliente: {
        type: String,
        required: true
    },
    rgCliente: {
        type: String,
        required: true
    },
    senhaCliente: {
        type: String,
        required: true
    }
})

const Cliente = model('Cliente', clienteSchema);

module.exports = Cliente;