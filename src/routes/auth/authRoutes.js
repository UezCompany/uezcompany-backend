const express = require('express');
const userTypeMiddleware = require('../../middleware/userMiddleware');
const authController = require('../../controllers/authController');
const ClienteController = require('../../controllers/clienteController');
const { validateBody } = require('../../middleware/validateMiddlewares');
const { getUserTypeMiddleware, userTypeMiddleware } = require('../../middleware/userMiddleware');
const router = express.Router();

/*
    /register - POST
    nome da rota -> validação geral do body -> validação específica do body -> cria o cliente(chama o controller)
    
    ...
*/
router.post('/register', validateBody, userTypeMiddleware);
router.post('/login', getUserTypeMiddleware, authController.login);

router.post('/funcionario/login', authController.loginFuncionario);

module.exports = router;