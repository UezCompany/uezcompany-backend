const validateBody = (req, res, next) => {
    const requestData = req.body;

    for (const field in requestData) {
        if (
            requestData[field] === undefined ||
            requestData[field] === '' ||
            requestData[field] === null
        ) {
            return res.status(400).json({ message: 'Todos os campos devem ser preenchidos' });
        }
    }

    console.log("Passou pelo validateBody com sucesso!")
    next();
}

const validateClienteRegisterBody = (req, res, next) => {
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
}



module.exports = {
    validateBody,
    validateClienteRegisterBody
}
