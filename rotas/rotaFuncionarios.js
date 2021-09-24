const fs = require('fs')
const caminhoFun = __dirname + '/listaFuncionarios.json'
const express = require('express')
const rota = express.Router()
const dados = require('../manipulacao/dadosFuncionario')

rota.get('/', (req, res, next) => {//LISTA TODOS OS FUNCIONÁRIOS
    res.status(200).send({
        'Lista dos funcionários': `${dados.listarFuncionarios()}`
    })
})

rota.get('/:codFun', (req, res, next) => {//LISTA UM FUNCIONÁRIO ESPECÍFICO
    res.status(200).send({
        'Busca concluída': `${dados.consultarFuncionario(req.params.codFun)}`
    })
})

rota.post('/', (req, res, next) => {//INSERE UM OU MAIS FUNCIONÁRIOS
    const lista = req.body
    const funcionarios = lista.map(json => json)
    for(i in funcionarios){
        const retorno = dados.inserirFuncionarios(funcionarios[i])
        res.status(201).send({
            Aviso: `${retorno}`
        })
    }  
})

rota.post('/000', (req, res, next) => {//IMPORTA FUNCIONÁRIOS
    const lista = JSON.parse(fs.readFileSync(caminhoFun, 'utf-8'))
    const funcionarios = lista.map(json => json)
    for(i in funcionarios){
        dados.inserirFuncionarios(funcionarios[i])
    }
    res.status(200).send({
        Aviso: 'Arquivo importado com sucesso!'
    })
})

rota.post('/999', (req, res, next) => {//EXPORTA FUNCIONÁRIOS
    fs.writeFile(caminhoFun, JSON.stringify(dados.getListaFuncionarios()), (err, conteudo) => {
        console.log(err || 'Arquivo salvo!')
    })

    res.status(200).send({
        Aviso: 'Arquivo exportado com sucesso!'
    })
})

rota.put('/:codFun', (req, res, next) => {//ALTERA UM FUNCIONÁRIO
    const lista = req.body
    const funcionarios = lista.map(json => json)
    
    const retorno = dados.alterarFuncionario(req.params.codFun, funcionarios)

    res.status(200).send({
        Aviso: `${retorno}`
    })
})

rota.delete('/:codFun', (req, res, next) => {//DELETA UM FUNCIONÁRIO
    dados.excluirFuncionario(req.params.codFun)
    res.status(200).send({
        Sucesso: 'Funcionário excluído com sucesso!'
    })
})

rota.delete('/', (req, res, next) => {
    dados.excluirTudo()
    res.status(200).send({
        Sucesso: 'Todas as informações de funcionários foram excluídas!'
    })
})

module.exports = rota