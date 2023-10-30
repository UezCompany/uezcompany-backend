const { Schema, model } = require('../connection');

const uzerSchema = new Schema({
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
    historicoCriminal: {
        type: String,
        default: null
    },
    dataNascimento: {
        type: Date,
        default: ""
    },
    dataCadastro: {
        type: Date,
        default: new Date()
    },
    numeroTelefone: {
        type: String,
        default: null
    },
    avaliacao: {
        type: Number,
        default: 0
    },
    aprovacao: {
        type: Boolean,
        default: false
    },
    reprovacao: {
        type: Boolean,
        default: false
    },
    quantidadePedidosRealizados: {
        type: Number,
        default: 0
    },
    servicosPrestados: {
        type: Array,
        default: [{
            idServico: null, //Id do Serviço
            nomeServico: null, //Nome do Serviço
            tipoServico: null, //Online ou Presencial
            categoriaServico: null, //categoria do Serviço
            areaAtuacao: null //Area de Atuação em Km
        }]
    },
    photoUrl: {
        type: String,
        default: 'https://i.pinimg.com/280x280_RS/53/66/5d/53665d574976a6b66d283d7e3323bab9.jpg'
    },
    chats: [{
        _idChat: {
            type: String,
            required: true
        }
    }]

}, {
    versionKey: '__versionOfSchema__'
});

const Uzer = model('Uzer', uzerSchema);

module.exports = Uzer;   
