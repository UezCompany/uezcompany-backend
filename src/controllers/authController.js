const ClienteModel = require('../models/clienteModel');
const UzerModel = require('../models/uzerModel');
const funcionarioModel = require('../models/funcionarioModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const AuthController = {
    login: async (req, res) => {
        const { email, senha, userType } = req.body;

        try {
            let user = null;

            if (userType === 'cliente') {
                user = await ClienteModel.getClienteByEmail(email);
            } else if (userType === 'uzer') {
                user = await UzerModel.getUzerByEmail(email);
            }

            if (!user) {
                return res.status(401).json({ message: 'Usuário não encontrado' });
            }

            const senhaCorrespondente = user.senha;

            await bcrypt.compare(senha, senhaCorrespondente, (err, bcryptResult) => {
                if (err) {
                    // Erro do bcrypt
                    console.error(err);
                    return res.status(500).json({ message: 'Erro interno.' });
                } else if (bcryptResult) {
                    // A senha está correta
                    // Send JWT
                    const token = jwt.sign({ id: user.id, tipo: userType }, process.env.SECRET, { expiresIn: '24h' });
                    const decryptedToken = jwt.verify(token, process.env.SECRET);
                    res.status(200).json({ token, decryptedToken });
                } else {
                    // A senha está incorreta
                    return res.status(401).json({ message: 'Credenciais inválidas' });
                }
            });
        } catch (error) {
            console.error('Erro ao fazer login: ' + error.stack);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },
    loginFuncionario: async (req, res) => {
        const { idFuncionario, senhaFuncionario } = req.body;

        try {
            let funcionario = await funcionarioModel.getFuncionarioById(idFuncionario);
            if (!funcionario) {
                return res.status(401).json({ message: 'Credenciais inválidas' });
            }

            if (senhaFuncionario !== funcionario.senhaFuncionario) {
                return res.status(401).json({ message: 'Credenciais inválidas' });
            }

            res.status(200).json({ nomeFuncionario: funcionario.nomeFuncionario, message: 'Login efetuado com sucesso' });
        } catch (error) {
            console.error('Erro ao fazer login: ' + error.stack);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
};

module.exports = AuthController;
