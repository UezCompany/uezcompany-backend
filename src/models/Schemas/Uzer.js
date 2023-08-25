const { Schema, model } = require('mongoose');

const uzerSchema = new Schema({
    nomeUzer: {
        type: String,
        required: true
    },
    emailUzer: {
        type: String,
        required: true
    },
    cpfUzer: {
        type: String,
        required: true
    },
    rgUzer: {
        type: String,
        required: true
    },
    senhaUzer: {
        type: String,
        required: true
    }
})

const Uzer = model('Uzer', uzerSchema);

module.exports = Uzer