const express = require('express')
const authController = require('../../controllers/authController')
const ClienteController = require('../../controllers/clienteController')
const UzerController = require('../../controllers/uzerController')
const { getUserDataByDbMiddleware, userTypeMiddleware } = require('../../middleware/userMiddleware')
const router = express.Router()

router.post('/register', userTypeMiddleware, (req, res) => {
    const { userType } = req.body

    if (userType === 'cliente') {
        ClienteController.createCliente(req, res)
    } else if (userType === 'uzer') {
        UzerController.createUzer(req, res)
    } else if (userType === 'funcionario') {
        FuncionarioController.createFuncionario(req, res)
    } else {
        res.json({ message: 'Tipo de usuário inválido' }).status(400)
    }
})

router.post('/login', getUserDataByDbMiddleware, authController.login)

router.post('/funcionario/login', authController.loginFuncionario)

module.exports = router