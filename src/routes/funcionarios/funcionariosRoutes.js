const express = require('express')
const router = express.Router()
const { getAllFuncionarios, getFuncionarioById, createFuncionario } = require('../../controllers/funcionarioController')
const { getAllClientes, updateCliente } = require('../../controllers/clienteController')
const { getAllUzers, updateUzer } = require('../../controllers/uzerController')
const { createServico, deleteServico } = require('../../controllers/servicoController')

const CHECKAuthLocaLiNSTANCE = async (req, res, next) => {
    const { authorization } = req.headers // Extrai o token da requisição
    if (!authorization) {
        return res.status(401).json({ message: 'Token não informado' })
    }
    const [, token] = authorization.split(' ') // Extrai o token da string com "Bearer"

    if (token === process.env.LOCAL_INSTANCE_KEY) {
        return next()
    } else {
        console.log('Token inválido')
        return res.status(401).json({ message: 'Token inválido' })
    }
}

router.get('/funcionarios', getAllFuncionarios)
router.get('/funcionarios/:id', getFuncionarioById)
router.post('/funcionarios', createFuncionario)
router.get('/funcionariosSearch/clientes', CHECKAuthLocaLiNSTANCE, getAllClientes)
router.get('/funcionariosSearch/uzers', CHECKAuthLocaLiNSTANCE, getAllUzers)
router.put('/funcionariosSearch/clientes/:id', CHECKAuthLocaLiNSTANCE, updateCliente)
router.put('/funcionariosSearch/uzers/:id', CHECKAuthLocaLiNSTANCE, updateUzer)

router.post('/funcionarios/servicos', CHECKAuthLocaLiNSTANCE, createServico)
router.delete('/funcionarios/servicos/:id', CHECKAuthLocaLiNSTANCE, deleteServico)


// Outras rotas para o modelo de Funcionario

module.exports = router
