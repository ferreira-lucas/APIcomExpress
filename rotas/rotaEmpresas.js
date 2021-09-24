const fs = require('fs')
const caminhoEmp = __dirname + '/listaEmpresas.json'
const express = require('express')
const rota = express.Router()
const dados = require('../manipulacao/dadosEmpresa')

rota.get('/', (req, res, next) => {//LISTA TODAS AS EMPRESAS
    res.status(200).send({
        'Lista das empresas': `${dados.listarEmpresas()}`
    })
})

rota.get('/:codEmp', (req, res, next) => {//LISTA UMA EMPRESA ESPECÍFICA
    res.status(200).send({
        'Busca concluída': `${dados.consultarEmpresa(req.params.codEmp)}`
    })
})

rota.post('/', (req, res, next) => {//INSERE UMA OU MAIS EMPRESAS
    const lista = req.body
    const empresas = lista.map(json => json)
    for(i in empresas){
        dados.inserirEmpresas(empresas[i])
    }
    
    res.status(201).send({
        'Empresas cadastradas!': empresas
    })
})

rota.post('/000', (req, res, next) => {//IMPORTA EMPRESAS
    const lista = JSON.parse(fs.readFileSync(caminhoEmp, 'utf-8'))
    const empresas = lista.map(json => json)
    for(i in empresas){
        dados.inserirEmpresas(empresas[i])
    }
    res.status(200).send({
        Aviso: 'Arquivo importado com sucesso!'
    })
})

rota.post('/999', (req, res, next) => {//EXPORTA EMPRESAS
    fs.writeFile(caminhoEmp, JSON.stringify(dados.getListaEmpresas()), (err, conteudo) => {
        console.log(err || 'Arquivo salvo!')
    })
    res.status(200).send({
        Aviso: 'Arquivo exportado com sucesso!'
    })
})

rota.put('/:codEmp', (req, res, next) => {//ALTERA UMA EMPRESA
    const lista = req.body
    const empresas = lista.map(json => json)
    dados.alterarEmpresa(req.params.codEmp, empresas)

    res.status(200).send({
        Sucesso: 'Empresa alterada com sucesso!'
    })
})

rota.delete('/:codEmp', (req, res, next) => {//DELETA UMA EMPRESA
    dados.excluirEmpresa(req.params.codEmp)
    res.status(200).send({
        Sucesso: 'Empresa excluída com sucesso!'
    })
})

rota.delete('/', (req, res, next) => {
    dados.excluirTudo()
    res.status(200).send({
        Sucesso: 'Todas as informações de empresas foram excluídas!'
    })
})

module.exports = rota