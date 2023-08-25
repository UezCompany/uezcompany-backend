const express = require('express');
const userTypeMiddleware = require('../../middleware/userMiddleware');
const authController = require('../../controllers/authController');
const ClienteController = require('../../controllers/clienteController');
const { validateBody } = require('../../middleware/clienteMiddleware');
const router = express.Router();


router.post('/login', userTypeMiddleware, authController.login);
router.post('/register', validateBody, ClienteController.createCliente);

module.exports = router;