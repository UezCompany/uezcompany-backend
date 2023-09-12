const ClienteModel = require('../models/clienteModel');
const UzerModel = require('../models/uzerModel');

// Esse middleware verifica o tipo de usuário de acordo com o banco de dados
const getUserTypeByDbMiddleware = async (req, res, next) => {
    const { email } = req.body;

    // Verifique se o email está presente na tabela Cliente
    const cliente = await ClienteModel.getClienteByEmail(email);
    if (cliente) {
        req.body.userType = 'cliente';
        return next();
    }

    // Verifique se o email está presente na tabela Uzer
    const uzer = await UzerModel.getUzerByEmail(email);
    if (uzer) {
        req.body.userType = 'uzer';
        return next();
    }

    return res.status(401).json({ message: 'Usuário não encontrado' });
};


// Esse middleware verifica o tipo de usuário, de acordo com o userType enviado no body da requisição, e encaminhar para a sua respectiva forma de validação
const getUserTypeMiddleware = async (req, res, next) => {
    const { validateClienteRegisterBody, validateUzerRegisterBody, validateFuncionarioRegisterBody } = require('./validateMiddlewares');
    const { userType } = req.body;

    if (userType === "cliente") {
        return validateClienteRegisterBody(req, res, next);
    } else if (userType === 'uzer') {
        return validateUzerRegisterBody(req, res, next);
    } else if (userType === 'funcionario') {
        return validateFuncionarioRegisterBody(req, res, next);
    } else {
        return res.status(400).json({ message: 'Tipo de usuário inválido' });
    }
}

module.exports = {
    getUserTypeByDbMiddleware,
    userTypeMiddleware: getUserTypeMiddleware
};
