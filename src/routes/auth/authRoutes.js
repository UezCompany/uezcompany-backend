const express = require('express');
const authController = require('../../controllers/authController');
const ClienteController = require('../../controllers/clienteController');
const { validateBody } = require('../../middleware/validateMiddlewares');
const { getUserTypeByDbMiddleware, userTypeMiddleware } = require('../../middleware/userMiddleware');
const router = express.Router();

/*
    /register - POST
    nome da rota -> validação geral do body -> validação específica do body -> cria o cliente(chama o controller)
    
    ...
*/
router.post('/register', validateBody, userTypeMiddleware, (req, res) => {
    const { userType } = req.body;

    if (userType === 'cliente') {
        ClienteController.createCliente(req, res);
    } else if (userType === 'uzer') {
        UzerController.createUzer(req, res);
    } else if (userType === 'funcionario') {
        FuncionarioController.createFuncionario(req, res);
    } else {
        res.status(400).json({ message: 'Tipo de usuário inválido' });
    }
});

router.post('/login', getUserTypeByDbMiddleware, authController.login);

router.post('/funcionario/login', authController.loginFuncionario);

module.exports = router;