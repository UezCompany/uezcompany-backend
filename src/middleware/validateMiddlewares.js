const moment = require('moment');

const validateField = (field, message, res, optionalValidationFunction = undefined) => {

    if (optionalValidationFunction) {
        if (!optionalValidationFunction(field) || !field || field === '') {
            return res.status(400).json({ message });
        }
    } else {
        if (!field || field === '') {
            return res.status(400).json({ message });
        }
    }

};

const validateCPF = (cpf) => /^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$/.test(cpf);
const validateRG = (rg) => /^[0-9]{2}.[0-9]{3}.[0-9]{3}-[0-9]{1}$/.test(rg);
const validateCEP = (cep) => /^[0-9]{5}-[0-9]{3}$/.test(cep);

const validateMiddlewares = {
    validateBody: (req, res, next) => {
        const requestData = req.body;

        for (const field in requestData) {
            validateField(requestData[field], 'Todos os campos devem ser corretamente preenchidos', res);
        }

        console.log('Passou pelo validateBody com sucesso!');
        next();
    },

    validateClienteRegisterBody: (req, res, next) => {
        const {
            nome,
            email,
            senha,
            cpf,
            rg,
            cep,
            endereco,
            telefone,
            dataNasc
        } = req.body;

        validateField(nome, 'O nome do cliente é inválido', res);
        validateField(email, 'O email do cliente é inválido', res);
        validateField(senha, 'A senha do cliente é inválida', res);
        validateField(cpf, 'O CPF do cliente é inválido', res, validateCPF);
        validateField(rg, 'O RG do cliente é inválido', res, validateRG);
        validateField(cep, 'O CEP do cliente é inválido', res, validateCEP);

        const { logradouro, numero, bairro, cidade, estado } = endereco;
        validateField(logradouro, 'O endereço do cliente é inválido', res);
        validateField(numero, 'O endereço do cliente é inválido', res);
        validateField(bairro, 'O endereço do cliente é inválido', res);
        validateField(cidade, 'O endereço do cliente é inválido', res);
        validateField(estado, 'O endereço do cliente é inválido', res);

        validateField(telefone, 'O telefone do cliente é inválido', res);
        validateField(dataNasc, 'A data de nascimento do cliente é inválida', res);

        req.body = {
            nome,
            email,
            CPF: cpf,
            RG: rg,
            senha,
            CEP: cep,
            endereco,
            dataNascimento: dataNasc,
            dataCadastro: moment().format('HH:mm:ss DD/MM/YYYY'),
            numeroTelefone: telefone,
            userType: 'cliente'
        };

        console.log('Passou pelo validateClienteRegisterBody com sucesso!');
        next();
    },

    validateUzerRegisterBody: (req, res, next) => {
        const {
            email,
            nome,
            senha,
            dataNasc,
            cpf,
            rg,
            cep,
            endereco,
            tipoServico,
            areaAtuacao,
            categoriaServico,
            nomeServico,
            telefone
        } = req.body;

        validateField(nome, 'O nome do uzer é inválido', res);
        validateField(email, 'O email do uzer é inválido', res);
        validateField(senha, 'A senha do uzer é inválida', res);
        validateField(cpf, 'O CPF do uzer é inválido', res, validateCPF);
        validateField(rg, 'O RG do uzer é inválido', res, validateRG);
        validateField(cep, 'O CEP do uzer é inválido', res, validateCEP);

        const { logradouro, numero, bairro, cidade, estado, complemento } = endereco;
        validateField(logradouro, 'O endereço do uzer é inválido', res);
        validateField(numero, 'O endereço do uzer é inválido', res);
        validateField(bairro, 'O endereço do uzer é inválido', res);
        validateField(cidade, 'O endereço do uzer é inválido', res);
        validateField(estado, 'O endereço do uzer é inválido', res);
        validateField(complemento, 'O endereço do uzer é inválido', res);

        validateField(telefone, 'O telefone do uzer é inválido', res);
        validateField(dataNasc, 'A data de nascimento do uzer é inválida', res);
        validateField(tipoServico, 'O tipo de serviço do uzer é inválido', res);
        validateField(areaAtuacao, 'A área de atuação do uzer é inválida', res);
        validateField(categoriaServico, 'A categoria do serviço do uzer é inválida', res);
        validateField(nomeServico, 'O nome do serviço do uzer é inválido', res);

        req.body = {
            nome,
            email,
            CPF: cpf,
            RG: rg,
            senha,
            CEP: cep,
            endereco,
            dataNascimento: dataNasc,
            dataCadastro: moment().format('HH:mm:ss DD/MM/YYYY'),
            numeroTelefone: telefone,
            servicosPrestados: {
                nomeServico,
                tipoServico,
                categoriaServico,
                areaAtuacao,
            },
            userType: 'uzer'
        };

        console.log('Passou pelo validateUzerRegisterBody com sucesso!');
        next();
    },


    validateCreateServicoBody: (req, res, next) => {
        const {
            nome,
            tipo,
            categoria
        } = req.body;

        validateField(nome, 'O nome do serviço é inválido', res);
        validateField(tipo, 'O tipo do serviço é inválido', res);
        validateField(categoria, 'A categoria do serviço é inválida', res);

        req.body = {
            nomeServico: nome,
            tipoServico: tipo,
            categoriaServico: categoria
        };

        console.log('Passou pelo validateServicoRegisterBody com sucesso!');
        next();
    }
};

module.exports = validateMiddlewares;
