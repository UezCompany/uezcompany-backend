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
        default: null
    },
    senhaCliente: {
        type: String,
        required: true,
    },
    situacaoCliente: {
        type: String,
        default: "null"
    },
    motivobanCliente: {
        type: String,
        default: null
    },
    cepCliente: {
        type: String,
        default: null
    },
    enderecoCliente: {
        type: Object,
        default: {
            logradouro: null,
            numero: null,
            complemento: null,
            bairro: null,
            cidade: null,
            estado: null
        }
    },
    historicocriminalCliente: {
        type: String,
        default: null
    },
    datacadCliente: {
        type: Date,
        default: new Date()
    },
    telefoneCliente: {
        type: String,
        default: null
    },
    aprovacaoCliente: {
        type: Boolean,
        default: false
    },
    avaliacaoCliente: {
        type: Number,
        default: 0
    },
    reprovacaoCliente: {
        type: Boolean,
        default: false
    },
    quantidadepedidosCliente: {
        type: Number,
        default: 0
    }
}, {
    versionKey: '__versionOfSchema__'  
});

const Cliente = model('Cliente', clienteSchema);

module.exports = Cliente;   
