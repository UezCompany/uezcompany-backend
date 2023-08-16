const validarCliente = (req, res, next) => {
    const { emailCliente, cpfCliente, rgCliente, senhaCliente } = req.body;
    if (!emailCliente || !cpfCliente || !rgCliente || !senhaCliente) {
        return res.status(400).json({ message: 'Todos os campos devem ser preenchidos' });
    }
    if(!emailCliente.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
        return res.status(400).json({ message: 'Email inválido' });
    }
    if(!cpfCliente.match(/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}$/)){
        return res.status(400).json({ message: 'CPF inválido' });
    }
    if(!rgCliente.match(/^[0-9]{9}$/)){
        return res.status(400).json({ message: 'RG inválido' });
    }
    if(!senhaCliente.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)){
        
    }
    next();
}