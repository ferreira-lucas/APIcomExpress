var _listaFuncionarios = new Array
const dadosEmp = require('./dadosEmpresa')
const dadosCarg = require('./dadosCargo')

const dados = {
    inserirFuncionarios: function(funcionario){
        const fun = {
            cpf: funcionario.cpf,
            nome: funcionario.nome,
            dataNasc: funcionario.dataNasc,
            sexo: funcionario.sexo,
            salario: funcionario.salario,
            dataAdmissao: funcionario.dataAdmissao,
            codCargo: funcionario.codCargo,
            codEmp: funcionario.codEmp
        }
        
        const listaEmp = dadosEmp.getListaEmpresas()
        const listaCarg = dadosCarg.getListaCargos()

        if(listaCarg[fun.codCargo] == null){
            throw {toString: function(){ return "Cargo não cadastrado, tente novamente!"}}
        }

        if(listaEmp[fun.codEmp] == null){
            throw {toString: function(){ return "Empresa não cadastrada, tente novamente!"}}
        }

        _listaFuncionarios.push(fun)
        return `Funcionário ${_listaFuncionarios.length-1} cadastrado!`
    },

    listarFuncionarios: function(){
        return JSON.stringify(_listaFuncionarios)
    },

    consultarFuncionario: function(index){
        return JSON.stringify(_listaFuncionarios[index])
    },

    alterarFuncionario: function(index, funcionarios){
        const fun = {
            cpf: funcionarios[0].cpf,
            nome: funcionarios[0].nome,
            dataNasc: funcionarios[0].dataNasc,
            sexo: funcionarios[0].sexo,
            salario: funcionarios[0].salario,
            dataAdmissao: funcionarios[0].dataAdmissao,
            codCargo: funcionarios[0].codCargo,
            codEmp: funcionarios[0].codEmp
        }

        const listaEmp = dadosEmp.getListaEmpresas()
        const listaCarg = dadosCarg.getListaCargos()

        if(listaCarg[fun.codCargo] == null){
            throw {toString: function(){ return "Cargo não cadastrado, tente novamente!"}}
        }

        if(listaEmp[fun.codEmp] == null){
            throw {toString: function(){ return "Empresa não cadastrada, tente novamente!"}}
        }

        _listaFuncionarios[index].cpf = fun.cpf
        _listaFuncionarios[index].nome = fun.nome
        _listaFuncionarios[index].dataNasc = fun.dataNasc
        _listaFuncionarios[index].sexo = fun.sexo
        _listaFuncionarios[index].salario = fun.salario
        _listaFuncionarios[index].dataAdmissao = fun.dataAdmissao
        _listaFuncionarios[index].codCargo = fun.codCargo
        _listaFuncionarios[index].codEmp = fun.codEmp

        return `Funcionário ${index} alterado!`
    },

    excluirFuncionario: function(index){
        _listaFuncionarios.splice(index, 1)
    },

    excluirTudo: function(){
        const tam = _listaFuncionarios.length
        for(i = 0; i < tam; i++){
            _listaFuncionarios.pop()
        }
    },

    getListaFuncionarios: function(){
        return _listaFuncionarios
    },

    setListaFuncionarios: function(valor){
        this._listaFuncionarios = valor
    }
}

module.exports = dados