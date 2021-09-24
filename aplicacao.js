const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const rotaEmpresas = require('./rotas/rotaEmpresas')
const rotaFuncionarios = require('./rotas/rotaFuncionarios')
const rotaCargos = require('./rotas/rotaCargos')

app.use('/rotaEmpresas', rotaEmpresas)
app.use('/rotaFuncionarios', rotaFuncionarios)
app.use('/rotaCargos', rotaCargos)

app.use((req, res, next) => {
    res.status(404).send({
        mensagem: 'Rota não encontrada!'
    })
})

module.exports = app