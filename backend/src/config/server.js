const port = 3005

//referencia de alguns middlewares

const bodyParser = require('body-parser')// converte os dados de requisição
const express = require('express')
const server = express()
const allowCors = require('./cors')
const queryParser = require('express-query-int')//como fazemos api restful e vamos paginar, a url deve conhecer o skip e o limit como inteiros e não strings

server.use(bodyParser.urlencoded({extended: true})) //interceptado pela requisição/ pra toda requisição que chegar use o bodyparser para interpretar
server.use(bodyParser.json())
server.use(allowCors)
server.use(queryParser())
server.listen(port, function(){
    
    console.log(` BACKEND is running on port ${port}.`)
    
})

module.exports = server