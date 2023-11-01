const { Schema, model } = require('../connection')

const chatSchema = new Schema({
    uzerId: {
        type: String,
        required: true
    },
    uzerService: {
        type: String,
        required: true
    },
    clienteId: {
        type: String,
        required: true
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
        default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    },
    clienteName: {
        type: String,
        default: "null"
    },
    uzerName: {
        type: String,
        default: "null"
    }
}, {
    versionKey: '__versionOfSchema__'
})

const Chat = model('Chat', chatSchema)

module.exports = Chat
