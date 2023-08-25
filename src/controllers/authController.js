const ClienteModel = require('../models/clienteModel');
const UzerModel = require('../models/uzerModel');
const funcionarioModel = require('../models/funcionarioModel');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const AuthController = {
    login: async (req, res) => {
        const { email, senha, userType } = req.body;

        try {
            let user = null;

            if (userType === 'cliente') {
                user = await ClienteModel.getClienteByEmail(email);
                console.log(user.senhaCliente);
            } else if (userType === 'uzer') {
                user = await UzerModel.getUzerByEmail(email);
            }

            user.senha = userType === 'cliente' ? user.senhaCliente : user.senhaUzer;
            user.id = userType === 'cliente' ? user.idCliente : user.idUzer;

            if (!user || user.senha !== senha) {
                console.log('Credenciais inválidas');
                return res.status(401).json({ message: 'Credenciais inválidas' });
            }

            const token = jwt.sign({ id: user.id, tipo: userType }, process.env.SECRET, { expiresIn: '24h' });
            const decryptedToken = jwt.verify(token, process.env.SECRET);

            res.status(200).json({ token, decryptedToken });
        } catch (error) {
            console.error('Erro ao fazer login: ' + error.stack);
            res.status(500).json({ message: 'Erro ao fazer login' });
        }
    },
    loginFuncionario: async (req, res) => {
        const { idFuncionario, senhaFuncionario } = req.body;
        
        try {
            let funcionario = await funcionarioModel.getFuncionarioById(idFuncionario);
            if(senhaFuncionario != funcionario.senhaFuncionario) {
                console.log('Credenciais inválidas');
                return res.status(401).json({ message: 'Credenciais inválidas' });
            }

            res.status(200).json({nomeFuncionario: funcionario.nomeFuncionario, message: 'Login efetuado com sucesso' });
        } catch (error) {
            console.error('Erro ao fazer login: ' + error.stack);
            res.status(401).json({ message: 'Erro ao fazer login' });
        }
    }
};

module.exports = AuthController;
