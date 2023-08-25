const ClienteModel = require('../models/clienteModel');
const UzerModel = require('../models/uzerModel');

const userTypeMiddleware = async (req, res, next) => {
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

module.exports = userTypeMiddleware;