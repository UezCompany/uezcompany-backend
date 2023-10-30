const { Schema, model } = require('../connection');

const chatSchema = new Schema({
    _idCliente: {
        type: String,
        required: true
    },
    _idUzer: {
        type: String,
        required: true
    },
    criadoEm: {
        type: Date,
        default: Date.now()
    },
    mensagens: [{
        conteudo: {
            type: String
        },
        dataEnvio: {
            type: String
        },
        horaEnvio: {
            type: String
        },

    }]
}, {
    versionKey: '__versionOfSchema__'
});

const Chat = model('Chat', chatSchema);

module.exports = Chat;   
