const express = require('express')
const router = express.Router()
const validateJWT = require('../middleware/authMiddleware')

const { getAllNotifications, sendNotification, markAsRead } = require('../controllers/notificationController')


router.get('/notifications', validateJWT, getAllNotifications)
router.post('/notification/send/:id', validateJWT, sendNotification)
router.put('/notification/read/:id', validateJWT, markAsRead)



module.exports = router