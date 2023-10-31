const { getCategoryByServico } = require("../models/servicoModel")


const validateField = (field, message, res, optionalValidationFunction = undefined) => {

    if (optionalValidationFunction) {
        if (optionalValidationFunction && !optionalValidationFunction(field)) {
            res.status(400).json({ message })
            console.error(new Error(message))
        }
    } else {
        if (!field) {
            res.status(400).json({ message })
            console.error(new Error(message))
        }
    }

}

const validateCPF = (cpf) => /^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$/.test(cpf)
const validateRG = (rg) => /^[0-9]{2}.[0-9]{3}.[0-9]{3}-[0-9]{1}$/.test(rg)
const validateCEP = (cep) => /^[0-9]{5}-[0-9]{3}$/.test(cep)

const validateMiddlewares = {
    validateBody: (req, res, next) => {
        const requestData = req.body

        for (const field in requestData) {
            validateField(requestData[field], 'Todos os campos devem ser corretamente preenchidos', res)
        }

        next()
    },

    validateClienteRegisterBody: (req, res, next) => {
        const {
            nome,
            email,
            senha,
            cpf,
            cep,
            endereco,
            telefone,
            dataNasc
        } = req.body

        if (req.body.rg) {
            validateField(req.body.rg, 'O RG do cliente é inválido', res, validateRG)
            console.log(req.body.rg)
        }

        validateField(nome, 'O nome do cliente é inválido', res)
        validateField(email, 'O email do cliente é inválido', res)
        validateField(senha, 'A senha do cliente é inválida', res)
        validateField(cpf, 'O CPF do cliente é inválido', res, validateCPF)
        validateField(cep, 'O CEP do cliente é inválido', res, validateCEP)

        if (endereco) {
            const { logradouro, numero, bairro, cidade, estado } = endereco
            validateField(logradouro, 'O endereço do cliente é inválido', res)
            validateField(numero, 'O endereço do cliente é inválido', res)
            validateField(bairro, 'O endereço do cliente é inválido', res)
            validateField(cidade, 'O endereço do cliente é inválido', res)
            validateField(estado, 'O endereço do cliente é inválido', res)
        } else { res.status(400).json({ messsage: "Informe o endereço corretamente." }) }

        validateField(telefone, 'O telefone do cliente é inválido', res)
        validateField(dataNasc, 'A data de nascimento do cliente é inválida', res)

        req.body = {
            nome,
            email,
            CPF: cpf,
            RG: req.body.rg || null,
            senha,
            CEP: cep,
            endereco,
            dataNascimento: dataNasc,
            dataCadastro: new Date().toISOString(),
            numeroTelefone: telefone,
            userType: 'cliente'
        }

        next()
    },

    validateUzerRegisterBody: async (req, res, next) => {
        const {
            email,
            nome,
            senha,
            dataNasc,
            cpf,
            cep,
            endereco,
            tipoServico,
            areaAtuacao,
            categoriaServico,
            nomeServico,
            telefone
        } = req.body

        if (req.body.rg) {
            validateField(req.body.rg, 'O RG do cliente é inválido', res, validateRG)
            console.log("Tem rg")
        }

        validateField(nome, 'O nome do uzer é inválido', res)
        validateField(email, 'O email do uzer é inválido', res)
        validateField(senha, 'A senha do uzer é inválida', res)
        validateField(cpf, 'O CPF do uzer é inválido', res, validateCPF)
        validateField(cep, 'O CEP do uzer é inválido', res, validateCEP)

        if (endereco) {
            const { logradouro, numero, bairro, cidade, estado } = endereco
            validateField(logradouro, 'O endereço do cliente é inválido', res)
            validateField(numero, 'O endereço do cliente é inválido', res)
            validateField(bairro, 'O endereço do cliente é inválido', res)
            validateField(cidade, 'O endereço do cliente é inválido', res)
            validateField(estado, 'O endereço do cliente é inválido', res)
        } else { res.status(400).json({ messsage: "Informe o endereço corretamente." }) }

        validateField(telefone, 'O telefone do uzer é inválido', res)
        validateField(dataNasc, 'A data de nascimento do uzer é inválida', res)
        validateField(tipoServico, 'O tipo de serviço do uzer é inválido', res)
        validateField(areaAtuacao, 'A área de atuação do uzer é inválida', res)
        validateField(categoriaServico, 'A categoria do serviço do uzer é inválida', res)
        validateField(nomeServico, 'O nome do serviço do uzer é inválido', res)

        req.body = {
            nome,
            email,
            CPF: cpf,
            RG: req.body.rg || null,
            senha,
            CEP: cep,
            endereco,
            dataNascimento: dataNasc,
            dataCadastro: new Date().toISOString(),
            numeroTelefone: telefone,
            servicosPrestados: {
                nomeServico,
                tipoServico,
                categoriaServico,
                areaAtuacao,
            },
            userType: 'uzer'
        }

        next()
    },


    validateCreateServicoBody: (req, res, next) => {
        const {
            nome,
            tipo,
            categoria
        } = req.body

        validateField(nome, 'O nome do serviço é inválido', res)
        validateField(tipo, 'O tipo do serviço é inválido', res)
        validateField(categoria, 'A categoria do serviço é inválida', res)

        req.body = {
            nomeServico: nome,
            tipoServico: tipo,
            categoriaServico: categoria
        }

        next()
    },
    validateCreatePedidoBody: async (req, res, next) => {
        let valor

        if (req.body?.valor) {
            valor = req.body.valor
            validateField(valor, 'O valor do serviço é inválido', res)
        } else valor = 0

        const {
            tipoPedido,
            titulo,
            nomeServico,
            descricao,
            userId,
        } = req.body

        validateField(tipoPedido, 'O tipo do pedido é inválido', res)
        validateField(titulo, 'A categoria do serviço é inválida', res)
        validateField(nomeServico, 'O nome do serviço é inválido', res)
        validateField(descricao, 'A descrição do serviço é inválida', res)
        validateField(userId, 'O id do cliente é inválido', res)

        const categoriaServico = await getCategoryByServico(nomeServico)
        console.log("category", categoriaServico)

        req.body = {
            tipo: tipoPedido,
            categoriaServico: categoriaServico,
            tituloPedido: titulo,
            nomeServico: nomeServico,
            descricao: descricao,
            idCliente: userId,
            valor: valor,
            dataCriacao: new Date().toISOString(),
        }
        console.log("Req.body", req.body)
        next()

    }
}

module.exports = validateMiddlewares
