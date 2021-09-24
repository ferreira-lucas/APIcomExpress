var _listaCargos = new Array

const dados = {
    inserirCargos: function(cargo){
        const carg = {
            cargo: cargo.cargo
        }
        _listaCargos.push(carg)
    },

    listarCargos: function(){
        return JSON.stringify(_listaCargos)
    },

    consultarCargo: function(index){
        return JSON.stringify(_listaCargos[index])
    },

    alterarCargo: function(index, cargo){
        const carg = {
            cargo: cargo[0].cargo
        }
        _listaCargos[index].cargo = carg.cargo
    },

    excluirCargo: function(index){
        _listaCargos.splice(index, 1)
    },

    excluirTudo: function(){
        const tam = _listaCargos.length
        for(i = 0; i < tam; i++){
            _listaCargos.pop()
        }
    },

    getListaCargos: function(){
        return _listaCargos
    },

    setListaCargos: function(valor){
        this._listaCargos = valor
    }
}

module.exports = dados