const express = require('express')
const router = express.Router()
const ChatController = require('../controllers/chatController')
const validateJWT = require('../middleware/authMiddleware')
const { getUserDataByDbMiddleware } = require('../middleware/userMiddleware')

router.get('/chats', validateJWT, getUserDataByDbMiddleware, ChatController.getChats)
router.post('/chat/create/:requestedContactId',validateJWT, ChatController.createChat)
router.post('/chat/message', validateJWT, ChatController.sendMessage)


module.exports = router