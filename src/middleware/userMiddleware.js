const ClienteModel = require('../models/clienteModel');
const UzerModel = require('../models/uzerModel');

// Esse middleware verifica o tipo de usuário de acordo com o banco de dados
const getUserTypeByDbMiddleware = async (req, res, next) => {
    const { email } = req.body;

    // Verifique se o email está presente na tabela Cliente
    const cliente = await ClienteModel.getClienteByEmail(email);
    if (cliente) {
        console.log('Passou no userMiddleware, é um cliente');
        req.body.userType = 'cliente';
        return next();
    }

    // Verifique se o email está presente na tabela Uzer
    const uzer = await UzerModel.getUzerByEmail(email);
    if (uzer) {
        console.log('Passou no userMiddleware, é um uzer');
        req.body.userType = 'uzer';
        return next();
    }

    console.log('Usuário não encontrado');
    return res.status(401).json({ message: 'Usuário não encontrado' });
};


// Esse middleware verifica o tipo de usuário, de acordo com o userType enviado no body da requisição, e encaminhar para a sua respectiva forma de validação
const getUserTypeMiddleware = async (req, res, next) => {
    const { validateClienteRegisterBody, validateUzerRegisterBody, validateFuncionarioRegisterBody } = require('./validateMiddlewares');
    const { userType } = req.body;
    console.log(userType)
    console.log(req.body)
    
    if (userType === "cliente") {
        console.log('Passou no userMiddleware, é um cliente');
        return validateClienteRegisterBody(req, res, next);
    } else if (userType === 'uzer') {
        console.log('Passou no userMiddleware, é um uzer');
        return validateUzerRegisterBody(req, res, next);
    } else if (userType === 'funcionario') {
        console.log('Passou no userMiddleware, é um funcionário');
        return validateFuncionarioRegisterBody(req, res, next);
    } else {
        console.log('Tipo de usuário inválido');
        return res.status(400).json({ message: 'Tipo de usuário inválido' });
    }
}

module.exports = {
    getUserTypeByDbMiddleware,
    userTypeMiddleware: getUserTypeMiddleware
};
