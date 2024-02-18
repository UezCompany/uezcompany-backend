import ClienteModel from "../models/Cliente"
import UzerModel from "../models/Uzer"

async function getUserDataByEmail(email: string) {
  const cliente = await ClienteModel.getClienteByEmail(email)
  if (cliente) {
    return cliente
  }

  const uzer = await UzerModel.getUzerByEmail(email)
  if (uzer) {
    return uzer
  }
}

export default getUserDataByEmail
