const { Schema, model } = require('../connection');

const clienteSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    username: {
        type: String,
        default: null
    },
    email: {
        type: String,
        required: true
    },
    CPF: {
        type: String,
        required: true
    },
    RG: {
        type: String,
        default: null
    },
    senha: {
        type: String,
        required: true,
    },
    situacao: {
        type: String,
        default: "Pendente..."
    },
    motivoBloqueio: {
        type: String,
        default: null
    },
    CEP: {
        type: String,
        default: null
    },
    endereco: {
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
    dataNascimento: {
        type: Date,
        default: ""
    },
    dataCadastro: {
        type: Date,
        default: new Date()
    },
    telefone: {
        type: String,
        default: null
    },
    userType: {
        type: String,
        default: "cliente"
    },
    aprovacao: {
        type: Boolean,
        default: false
    },
    avaliacao: {
        type: Number,
        default: 0
    },
    reprovacao: {
        type: Boolean,
        default: false
    },
    quantidadePedidos: {
        type: Number,
        default: 0
    },
    photoUrl: {
        type: String,
        default: 'https://i.pinimg.com/280x280_RS/53/66/5d/53665d574976a6b66d283d7e3323bab9.jpg'
    }
}, {
    versionKey: '__versionOfSchema__'  
});

const Cliente = model('Cliente', clienteSchema);

module.exports = Cliente;   
