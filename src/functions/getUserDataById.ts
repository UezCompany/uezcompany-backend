import ClienteModel from "../models/Cliente"
import UzerModel from "../models/Uzer"

async function getUserDataById(id: string) {
  const cliente = await ClienteModel.getClienteById(id)
  if (cliente) {
    return cliente
  }

  const uzer = await UzerModel.getUzerById(id)
  if (uzer) {
    return uzer
  }
}

export default getUserDataById
