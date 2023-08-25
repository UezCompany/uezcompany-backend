const express = require('express');
const userTypeMiddleware = require('../../middleware/userMiddleware');
const authController = require('../../controllers/authController');
const ClienteController = require('../../controllers/clienteController');
const { validateBody } = require('../../middleware/validateMiddlewares');
const router = express.Router();

router.post('/register', validateBody, ClienteController.createCliente);
router.post('/login', userTypeMiddleware, authController.login);

router.post('/funcionario/login', authController.loginFuncionario);

module.exports = router;