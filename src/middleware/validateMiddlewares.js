const validateMiddlewares = {
    validateBody: (req, res, next) => {
        const requestData = req.body;

        for (const field in requestData) {
            if (
                requestData[field] === undefined ||
                requestData[field].trim() === '' ||
                requestData[field] === null
            ) {
                return res.status(400).json({ message: 'Todos os campos devem ser preenchidos' });
            }
        }

        console.log("Passou pelo validateBody com sucesso!")
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

        //Validação do Nome do Cliente
        if (!nome || nome === '' || nome.length < 3) {
            return res.status(400).json({ message: 'O nome do cliente é inválido' });
        }

        //Validação do Email do Cliente
        if (!email || email === '') {
            return res.status(400).json({ message: 'O email do cliente é inválido' });
        }

        //Validação da Senha do Cliente
        if (!senha || senha === '') {
            return res.status(400).json({ message: 'A senha do cliente é inválida' });
        }

        //Validação do CPF do Cliente
        const cpfRegex = new RegExp('[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}');
        if (!cpf || cpf === '' || cpfRegex.test(cpf) === false) {
            return res.status(400).json({ message: 'O CPF do cliente é inválido' });
        }

        //Validação do RG do Cliente
        const rgRegex = new RegExp('[0-9]{2}.[0-9]{3}.[0-9]{3}-[0-9]{1}');
        if (!rg || rg === '' || rgRegex.test(rg) === false) {
            return res.status(400).json({ message: 'O RG do cliente é inválido' });
        }

        //Validação do CEP do Cliente
        const cepRegex = new RegExp('[0-9]{5}-[0-9]{3}');
        if (!cep || cep === '' || cepRegex.test(cep) === false) {
            return res.status(400).json({ message: 'O CEP do cliente é inválido' });
        }

        //Validação do Endereço do Cliente
        const { logradouro, numero, bairro, cidade, estado } = endereco;
        if (
            !logradouro ||
            !numero ||
            !bairro ||
            !cidade ||
            !estado ||
            logradouro === '' ||
            numero === '' ||
            bairro === '' ||
            cidade === '' ||
            estado === ''
        ) {
            return res.status(400).json({ message: 'O endereço do cliente é inválido' });
        }

        //Validação do Telefone do 
        if (!telefone || telefone === '' || telefone.length < 10) {
            return res.status(400).json({ message: 'O telefone do cliente é inválido' });
        }

        //Validação da Data de Nascimento do 
        if (!dataNasc || dataNasc === '') {
            return res.status(400).json({ message: 'A data de nascimento do cliente é inválida' });
        }

        console.log("Passou pelo validateClienteRegisterBody com sucesso!")
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
        } = req.body;

        //Validação do Nome do Uzer
        if (!nome || nome === '' || nome.length < 3) {
            return res.status(400).json({ message: 'O nome do uzer é inválido' });
        }

        //Validação do Email do Uzer
        if (!email || email === '') {
            return res.status(400).json({ message: 'O email do uzer é inválido' });
        }

        //Validação da Senha do Uzer
        if (!senha || senha === '') {
            return res.status(400).json({ message: 'A senha do uzer é inválida' });
        }

        //Validação do CPF do Uzer
        const cpfRegex = new RegExp('[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}');
        if (!cpf || cpf === '' || cpfRegex.test(cpf) === false) {
            return res.status(400).json({ message: 'O CPF do uzer é inválido' });
        }

        //Validação do RG do Uzer
        const rgRegex = new RegExp('[0-9]{2}.[0-9]{3}.[0-9]{3}-[0-9]{1}');
        if (!rg || rg === '' || rgRegex.test(rg) === false) {
            return res.status(400).json({ message: 'O RG do uzer é inválido' });
        }

        //Validação do CEP do Uzer
        const cepRegex = new RegExp('[0-9]{5}-[0-9]{3}');
        if (!cep || cep === '' || cepRegex.test(cep) === false) {
            return res.status(400).json({ message: 'O CEP do uzer é inválido' });
        }

        //Validação do Endereço do Uzer
        const { logradouro, numero, bairro, cidade, estado, complemento } = endereco;
        if (
            !logradouro ||
            !numero ||
            !bairro ||
            !cidade ||
            !estado ||
            !complemento ||
            logradouro === '' ||
            numero === '' ||
            bairro === '' ||
            cidade === '' ||
            estado === '' ||
            complemento === ''
        ) {
            return res.status(400).json({ message: 'O endereço do uzer é inválido' });
        }

        //Validação do Telefone do Uzer
        if (!telefone || telefone === '' || telefone.length < 10) {
            return res.status(400).json({ message: 'O telefone do uzer é inválido' });
        }

        //Validação da Data de Nascimento do Uzer
        if (!dataNasc || dataNasc === '') {
            return res.status(400).json({ message: 'A data de nascimento do uzer é inválida' });
        }

        //Validação do Tipo de Serviço do Uzer
        if (!tipoServico || tipoServico === '' || tipoServico.length < 3) {
            return res.status(400).json({ message: 'O tipo de serviço do uzer é inválido' });
        }

        //Validação da Area de Atuação do Uzer
        if (!areaAtuacao || areaAtuacao === '') {
            return res.status(400).json({ message: 'A área de atuação do uzer é inválida' });
        }

        //Validação da Categoria do Serviço do Uzer
        if (!categoriaServico || categoriaServico === '' || categoriaServico.length < 3) {
            return res.status(400).json({ message: 'A categoria do serviço do uzer é inválida' });
        }

        //Validação do Nome do Serviço do Uzer
        if (!nomeServico || nomeServico === '' || nomeServico.length < 3) {
            return res.status(400).json({ message: 'O nome do serviço do uzer é inválido' });
        }


        console.log("Passou pelo validateUzerRegisterBody com sucesso!")

        req.body = {
            nome: nome,
            email: email,
            CPF: cpf,
            RG: rg,
            senha: senha,
            CEP: cep,
            endereco: endereco,
            dataNascimento: dataNasc,
            dataCadastro: new Date(),
            numeroTelefone: telefone,
            servicosPrestados: {
                nomeServico: nomeServico,
                tipoServico: tipoServico,
                categoriaServico: categoriaServico,
                areaAtuacao: areaAtuacao,
            }

        }

        next();

    },
    validateCreateServicoBody: (req, res, next) => {
        const {
            nome,
            tipo,
            categoria,
        } = req.body;

        //Validação do Nome do Serviço
        if (!nome || nome === '' || nome.length < 3) {
            return res.status(400).json({ message: 'O nome do serviço é inválido' });
        }

        //Validação do Tipo do Serviço
        if (!tipo || tipo === '' || tipo.length < 3) {
            return res.status(400).json({ message: 'O tipo do serviço é inválido' });
        }

        //Validação da Categoria do Serviço
        if (!categoria || categoria === '' || categoria.length < 3) {
            return res.status(400).json({ message: 'A categoria do serviço é inválida' });
        }

        req.body = {
            nomeServico: nome,
            tipoServico: tipo,
            categoriaServico: categoria
        }

        console.log("Passou pelo validateServicoRegisterBody com sucesso!")
        next();

    }
}

module.exports = validateMiddlewares
