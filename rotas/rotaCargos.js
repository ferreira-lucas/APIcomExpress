const fs = require('fs')
const caminhoCarg = __dirname + '/listaCargos.json'
const express = require('express')
const rota = express.Router()
const dados = require('../manipulacao/dadosCargo')

rota.get('/', (req, res, next) => {//LISTA TODOS OS CARGOS
    res.status(200).send({
        'Lista dos cargos': `${dados.listarCargos()}`
    })
})

rota.get('/:codCarg', (req, res, next) => {//LISTA UM CARGO ESPECÍFICO
    res.status(200).send({
        'Busca concluída': `${dados.consultarCargo(req.params.codCarg)}`
    })
})

rota.post('/', (req, res, next) => {//INSERE UM OU MAIS CARGOS
    const lista = req.body
    const cargos = lista.map(json => json)
    for(i in cargos){
        dados.inserirCargos(cargos[i])
    }

    res.status(201).send({
        'Cargos cadastrados!': cargos
    })
})

rota.post('/000', (req, res, next) => {//IMPORTA CARGOS
    const lista = JSON.parse(fs.readFileSync(caminhoCarg, 'utf-8'))
    const cargos = lista.map(json => json)
    for(i in cargos){
        dados.inserirCargos(cargos[i])
    }
    res.status(200).send({
        Aviso: 'Arquivo importado com sucesso!'
    })
})

rota.post('/999', (req, res, next) => {//EXPORTA CARGOS
    fs.writeFile(caminhoCarg, JSON.stringify(dados.getListaCargos()), (err, conteudo) => {
        console.log(err || 'Arquivo salvo!')
    })
    res.status(200).send({
        Aviso: 'Arquivo exportado com sucesso!'
    })
})

rota.put('/:codCarg', (req, res, next) => {//ALTERA UM CARGO
    const lista = req.body
    const cargos = lista.map(json => json)
    dados.alterarCargo(req.params.codCarg, cargos)

    res.status(200).send({
        Sucesso: 'Cargo alterado com sucesso!'
    })
})

rota.delete('/:codCarg', (req, res, next) => {//DELETA UM CARGO
    dados.excluirCargo(req.params.codCarg)
    res.status(200).send({
        Sucesso: 'Cargo excluído com sucesso!'
    })
})

rota.delete('/', (req, res, next) => {
    dados.excluirTudo()
    res.status(200).send({
        Sucesso: 'Todas as informações de cargos foram excluídas!'
    })
})

module.exports = rota