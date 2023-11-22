const { Schema, model } = require('../connection')

const notificationsSchema = new Schema(
    {
        type: {
            type: String,
            required: true

        },
        content: {
            type: String,
            required: true

        },
        meta : {
            type : Date,
            default : Date.now()
        },
        _idUser : {
            type : String,
            required : true
        },
        readed : {
            type : Boolean,
            default : false
        }
   
    },
    {
        versionKey: '__versionOfSchema__'
    }
)

const Notifications = model('Notifications', notificationsSchema)

module.exports = Notifications
