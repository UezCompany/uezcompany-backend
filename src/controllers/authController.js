const ClienteModel = require('../models/clienteModel');
const UzerModel = require('../models/uzerModel');
const jwt = require('jsonwebtoken');

const AuthController = {
    login: async (req, res) => {
        const { email, senha, tipoUsuario } = req.body;

        try {
            let user = null;

            if (tipoUsuario === 'cliente') {
                user = await ClienteModel.getClienteByEmail(email);
            } else if (tipoUsuario === 'uzer') {
                user = await UzerModel.getUzerByEmail(email);
            }

            if (!user || user.senha !== senha) {
                return res.status(401).json({ message: 'Credenciais inválidas' });
            }

            const token = jwt.sign({ id: user.id }, 'seuSegredo', { expiresIn: '1h' });

            res.json({ token });
        } catch (error) {
            console.error('Erro ao fazer login: ' + error.stack);
            res.status(500).json({ message: 'Erro ao fazer login' });
        }
    },
};

module.exports = AuthController;
