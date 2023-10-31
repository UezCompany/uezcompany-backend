const { Schema, model } = require('../connection')

const chatSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    uzerId: {
        type: String,
        required: true
    },
    uzerService: {
        type: String,
    },
    clienteId: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    messages: [{
        _id: {
            type: String,
        },
        sendDate: {
            type: String,
        },
        sendHour: {
            type: String,
        },
        senderId: {
            type: String,
        },
        content: {
            type: String,
        }
    }],
    photo: {
        type: String,
    },
    clienteName: {
        type: String,
    },
    uzerName: {
        type: String,
    }
}, {
    versionKey: '__versionOfSchema__'
})

const Chat = model('Chat', chatSchema)

module.exports = Chat
