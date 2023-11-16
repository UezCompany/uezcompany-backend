const express = require('express')
const router = express.Router()
const validateJWT = require('../middleware/authMiddleware')

const { getClienteById } = require('../models/clienteModel')
const { getUzerById } = require('../models/uzerModel')

const { getUserDataByDbMiddleware } = require('../middleware/userMiddleware')

router.get('/users/me', validateJWT, getUserDataByDbMiddleware, async (req, res) => {
    const { userId, userType } = req.body
    if (userType === 'both') {
        try {
            const cliente = await getClienteById(userId)
            const uzer = await getUzerById(userId)
            res.json({ clienteData: cliente, uzerData: uzer })
        } catch (error) {
            console.error('Erro ao obter o usuário pelo ID: ' + error.stack)
            res.status(500).json({ message: 'Erro ao obter o usuário pelo ID' })
        }
    } else if (userType === 'cliente') {
        try {
            req.body.id = userId
            const cliente = await getClienteById(userId)
            if (cliente) {
                return res.json(cliente)
            } else {
                return res.status(404).json({ message: 'Cliente não encontrado' })
            }
        } catch (error) {
            console.error('Erro ao obter cliente por ID: ' + error.stack)
            return res.status(500).json({ message: 'Erro ao obter cliente por ID' })
        }
    } else if (userType === 'uzer') {
        try {
            const uzer = await getUzerById(userId)
            if (uzer) {
                return res.json(uzer)
            } else {
                return res.status(404).json({ message: 'Uzer não encontrado' })
            }
        } catch (error) {
            console.error('Erro ao obter uzer por ID: ' + error.stack)
            return res.status(500).json({ message: 'Erro ao obter uzer por ID' })
        }
    }


})

router.post('/validate-email', (req, res) => {
    res.status(200).json({ message: `O e-mail ${req.body.email} é valido` })
})
router.post('/validate-username', (req, res) => {
    res.status(200).json({ message: `O username ${req.body.username} é valido` })
})
router.post('/validate-jwt', (req, res, next) => {
    const token = req.body.token
    req.headers.authorization = `Bearer ${token}`
    console.log(req.headers.authorization)
    next()
}, validateJWT, (req, res) => {
    return res.status(200).json({
        message: `O Token JWT: ${req.body.token} é valido`,
        token: req.body.token
    })
})

module.exports = router