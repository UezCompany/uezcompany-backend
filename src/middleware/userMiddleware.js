const ClienteModel = require('../models/Cliente');
const UzerModel = require('../models/Uzer');

const userTypeMiddleware = async (req, res, next) => {
    const { email } = req.body;

    // Verifique se o email está presente na tabela Cliente
    const cliente = await ClienteModel.getClienteByEmail(email);
    if (cliente) {
        req.userType = 'cliente';
        return next();
    }

    // Verifique se o email está presente na tabela Uzer
    const uzer = await UzerModel.getUzerByEmail(email);
    if (uzer) {
        req.userType = 'uzer';
        return next();
    }

    return res.status(401).json({ message: 'Usuário não encontrado' });
};

module.exports = userTypeMiddleware;
