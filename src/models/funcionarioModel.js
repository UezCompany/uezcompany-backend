const Funcionario = require('./Schemas/Funcionario')

const FuncionarioModel = {
  getAllFuncionarios: async () => {
    const funcionarios = await Funcionario.find({});
    return funcionarios;
  },
  getFuncionarioById: async (id) => {
    const funcionario = await Funcionario.findOne({ idFuncionario: id }).catch(err => console.error(err));
    return funcionario
  },
  getFuncionarioByEmail: async (email) => {
    const funcionario = await Funcionario.findOne({ emailFuncionario: email });
    return funcionario
  },
  createFuncionario: async (funcionario) => {
    const newFuncionario = await Funcionario.create(funcionario).catch(err => console.error(err));
    return newFuncionario
  },
  updateFuncionario: async (id, { emailFuncionario, cpfFuncionario, rgFuncionario, senhaFuncionario }) => {
    const updateFuncionario = await Funcionario.updateOne({ _id: id }, { emailFuncionario, cpfFuncionario, rgFuncionario, senhaFuncionario }).catch(err => console.error(err));
    return updateFuncionario
  },
  deleteFuncionario: async (id) => {
    const deleteFuncionario = Funcionario.deleteOne({ _id: id }).catch(err => console.error(err));
    return deleteFuncionario
  },
  // Outras funções para o modelo de Funcionario
};

module.exports = FuncionarioModel;
