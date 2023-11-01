const ClienteModel = require('../models/clienteModel')
const UzerModel = require('../models/uzerModel')

async function getUserDataById(id) {
    // Verifique se o email está presente na tabela Cliente
    const cliente = await ClienteModel.getClienteById(id)
    if (cliente) {
        return cliente
    }

    // Verifique se o email está presente na tabela Uzer
    const uzer = await UzerModel.getUzerById(id)
    if (uzer) {
        return uzer
    }

}

module.exports = getUserDataById