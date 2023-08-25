const { Schema, model } = require('../connection');

const funcionarioSchema = new Schema({
    idFuncionario: {
        type: String,
        required: true
    },
    nomeFuncionario: {
        type: String,
        required: true
    },
    emailFuncionario: {
        type: String,
        required: true
    },
    cpfFuncionario: {
        type: String,
        required: true
    },
    rgFuncionario: {
        type: String,
        required: true
    },
    senhaFuncionario: {
        type: String,   
        required: true
    },
    telefoneFuncionario: {
        type: String,
        required: true
    },
    cargoFuncionario: {
        type: String,
    },
    datacadFuncionario: {
        type: String,
    },
    situacaoFuncionario: {
        type: String,
    },
    motivodemicaoFuncionario: {
        type: String,
    },
    aprovacao: {
        type: Boolean,
    }

})

const Funcionario = model('Funcionario', funcionarioSchema);

module.exports = Funcionario;


/* 
idFuncionario
"0"
nomeFuncionario
"João David"
emailFuncionario
"joaodavid@gmail.com"
senhaFuncionario
"david"
telefoneFuncionario
"+55 (21)98296-4498"
cpfFuncionario
"187.600.677-30"
rgFuncionario
"82.394.733-4"
cargoFuncionario
"Dev Desktop"
datacadFuncionario
"17:01:57 28/06/2023"
situacaoFuncionario
"Ativo"
motivodemicaoFuncionario
"nulo"
aprovacao
"1"*/