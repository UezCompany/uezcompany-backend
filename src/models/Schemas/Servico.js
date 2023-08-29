const {Schema, model} = require('../connection');

const servicoSchema = new Schema({
    idServico: {
        type: Number,
        required: true
    },
    nomeServico: {
        type: String,
        required: true
    },
    tipoServico: {
        type: String,
        required: true
    },
    categoriaServico: {
        type: String,
        required: true
    },
    descricaoServico: {
        type: String,
        required: true
    },
    quantidadeFeitos: {
        type: Number,
        default: 0
    }
})

const Servico = model('Servico', servicoSchema);

module.exports = Servico;
