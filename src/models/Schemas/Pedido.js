const { Schema, model } = require('../connection')

const pedidoSchema = new Schema(
    {
        tipo: {
            type: String,
            required: true
        },
        _categoriaServico: {
            type: String,
            required: true,
        },
        _servico: {
            type: String,
            required: true
        },
        titulo: {
            type: String,
            required: true
        },
        descricao: {
            type: String,
            default: 'Pedido criado na UezCompany, somente um Uzer pode finaliza-lo.'
        },
        status: {
            type: String,
            default: 'A realizar',
        },
        disponivel: {
            type: Boolean,
            default: true
        },
        _id_uzer: {
            type: String,
            default: null
        },
        _id_cliente: {
            type: String,
            required: true
        },
        dataCriacao: {
            type: Date,
            default: new Date()
        },
        dataFinalizacao: {
            type: Date,
            default: null
        },
        valor: {
            type: Number,
            default: 0
        },
        images: {
            type: Array,
            default: []
        },
        avaliacao: {
            type: Number,
            default: 0
        },
        avaliado: {
            type: Boolean,
            default: false
        }
    },
    {
        versionKey: '__versionOfSchema__'
    }
)

const Pedido = model('Pedido', pedidoSchema)

module.exports = Pedido
