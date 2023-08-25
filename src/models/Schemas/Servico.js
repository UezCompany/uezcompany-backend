const {Schema, model} = require('../connection');

const servicoSchema = new Schema({
    idServico: {
        type: String,
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
    }
})

const Servico = model('Servico', servicoSchema);

module.exports = Servico;
