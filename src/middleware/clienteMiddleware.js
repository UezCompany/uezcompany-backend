const validateBody = (req, res, next) => {
    const { emailCliente, cpfCliente, rgCliente, senhaCliente } = req.body;

    if (!emailCliente || !cpfCliente || !rgCliente || !senhaCliente ||
        emailCliente === undefined || cpfCliente === undefined || rgCliente === undefined || senhaCliente === undefined ||
        emailCliente === '' || cpfCliente === '' || rgCliente === '' || senhaCliente === '' ||
        emailCliente === null || cpfCliente === null || rgCliente === null || senhaCliente === null) {
        return res.status(400).json({ message: 'Todos os campos devem ser preenchidos' });
    }

    next();
}

module.exports = {
    validateBody
}
