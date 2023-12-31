const express = require('express')
const router = express.Router()
const ChatController = require('../controllers/chatController')
const validateJWT = require('../middleware/authMiddleware')
const { getUserDataByDbMiddleware } = require('../middleware/userMiddleware')

router.get('/chats', validateJWT, getUserDataByDbMiddleware, ChatController.getChats)
router.post('/chat/create/:requestedContactId', validateJWT, ChatController.createChat)
router.post('/chat/message', validateJWT, ChatController.sendMessage)
router.post('/chat/message/budget', validateJWT, ChatController.sendBudgetMessage)
router.post('/chat/message/image', validateJWT, ChatController.sendMessage)
router.delete('/chat/delete/:chatId', validateJWT, ChatController.deleteChat)



module.exports = router