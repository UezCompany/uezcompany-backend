const express = require('express');
const userTypeMiddleware = require('../../middleware/userMiddleware');
const authController = require('../../controllers/authController');
const router = express.Router();


router.post('/login', userTypeMiddleware, authController.login);