import Uzer from "../schemas/Uzer"
import IUzer from "../@types/Uzer"

const UzerModel = {
  getAllUzers: async () => {
    const uzers = await Uzer.find({}, "-CPF -RG -senha")
    return uzers
  },
  getUzerById: async (id: string) => {
    const uzer = await Uzer.findById(id, "-CPF -RG -senha").catch((err) =>
      console.error(err),
    )
    return uzer
  },
  getUzerByEmail: async (email: string) => {
    const uzer = await Uzer.findOne({ email: email }).catch((err) =>
      console.error(err),
    )
    return uzer
  },
  getUzerByCpf: async (cpf: string) => {
    const uzer = await Uzer.findOne({ CPF: cpf }).catch((err) =>
      console.error(err),
    )
    return uzer
  },
  createUzer: async (uzer: IUzer) => {
    const newUzer = await Uzer.create(uzer).catch((err) => err)
    return newUzer
  },
  updateUzer: async (id: string, updateData: IUzer) => {
    const updateUzer = await Uzer.updateOne({ _id: id }, updateData).catch(
      (err) => console.error(err),
    )
    return updateUzer
  },
  deleteUzer: async (id: string) => {
    const deleteUzer = Uzer.deleteOne({ _id: id }).catch((err) =>
      console.error(err),
    )
    return deleteUzer
  },
  avaliarUzer: async (idUzer: string, avaliacao: number | string) => {
    const prevUzerData = await Uzer.findOne({ _id: idUzer })
    if (!prevUzerData) {
      return
    }
    await Uzer.updateOne(
      { _id: idUzer },
      { avaliado: true, $push: { avaliacoes: avaliacao } },
    ).catch((err) => console.error(err))
    const newAvaliacao =
      prevUzerData.avaliacoes.length === 0
        ? avaliacao
        : (prevUzerData.avaliacoes.reduce(
            (acc, curr) => Number(acc) + Number(curr),
            0,
          ) +
            Number(avaliacao)) /
          (prevUzerData.avaliacoes.length + 1)
    const uzer = await Uzer.updateOne(
      { _id: idUzer },
      { avaliado: true, avaliacao: newAvaliacao },
    ).catch((err) => console.error(err))
    return uzer
  },
}

export default UzerModel
