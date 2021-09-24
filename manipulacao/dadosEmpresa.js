var _listaEmpresas = new Array

const dados = {
    inserirEmpresas: function(empresa){
        const emp = {
            cnpj: empresa.cnpj,
            razaoSocial: empresa.razaoSocial,
            nomeFantasia: empresa.nomeFantasia,
            ramoAtuacao: empresa.ramoAtuacao
        }
        _listaEmpresas.push(emp)
    },

    listarEmpresas: function(){
        return JSON.stringify(_listaEmpresas)
    },

    consultarEmpresa: function(index){
        return JSON.stringify(_listaEmpresas[index])
    },

    alterarEmpresa: function(index, empresas){
        const emp = {
            cnpj: empresas[0].cnpj,
            razaoSocial: empresas[0].razaoSocial,
            nomeFantasia: empresas[0].nomeFantasia,
            ramoAtuacao: empresas[0].ramoAtuacao
        }
        _listaEmpresas[index].cnpj = emp.cnpj
        _listaEmpresas[index].razaoSocial = emp.razaoSocial
        _listaEmpresas[index].nomeFantasia = emp.nomeFantasia
        _listaEmpresas[index].ramoAtuacao = emp.ramoAtuacao
    },

    excluirEmpresa: function(index){
        _listaEmpresas.splice(index, 1)
    },

    excluirTudo: function(){
        const tam = _listaEmpresas.length
        for(i = 0; i < tam; i++){
            _listaEmpresas.pop()
        }
    },

    getListaEmpresas: function(){
        return _listaEmpresas
    },

    setListaEmpresas: function(valor){
        this._listaEmpresas = valor
    }
}

module.exports = dados