const {Schema, model} = require('../connection');

const servicoSchema = new Schema({
    idServico: {
        type: Number,
        
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
        default: 'Serviço oferecido pela UezCompany'
    },
    quantidadeFeitos: {
        type: Number,
        default: 0
    }
})

const Servico = model('Servico', servicoSchema);

module.exports = Servico;
