const jwt = require('jsonwebtoken');

const validateJWT = async (req, res, next) => {
    const { authorization } = req.headers; // Extrai o token da requisição
    if (!authorization) {
        return res.status(401).json({ message: 'Token não informado' });
    }
    const [, token] = authorization.split(' '); // Extrai o token da string com "Bearer"
    try {
        const { id } = jwt.verify(token, process.env.SECRET);
        req.body.userId = id;
        console.log("JWT Válido");
        return next();
    } catch (error) {
        console.error('Erro ao validar token: ' + error.stack);
        return res.status(401).json({ message: 'Token inválido' });
    }
}

module.exports = validateJWT