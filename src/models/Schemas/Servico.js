const { Schema, model } = require('../connection')

const servicoSchema = new Schema({
    idServico: {
        type: Number,
        default: null
    },
    nome: {
        type: String,
        required: true
    },
    tipo: {
        type: Array,
        required: true,
        default: ["Online"]
    },
    categoria: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        default: 'Serviço oferecido pela UezCompany'
    },
    quantidadeFeitos: {
        type: Number,
        default: 0
    }
}, {
    versionKey: '__versionOfSchema__'
})

const Servico = model('Servico', servicoSchema)

module.exports = Servico
