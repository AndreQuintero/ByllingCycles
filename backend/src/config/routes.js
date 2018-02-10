const express = require('express')
const auth = require('./auth') // middleware criado por nós


module.exports = function(server){
    
    
    //define url básica/ protegidas por token jwt
    const protectedApi = express.Router()
    
    server.use('/api', protectedApi)

    protectedApi.use(auth)
    
    //ROTAS DE CCICLO DE PAGAMENTO
    
    const BillingCycle = require('../api/billingCycle/billingCycleService')
    
    BillingCycle.register(protectedApi, '/billingCycles')


        //Rotas abertas, no caso para login e cadastro

        const openApi = express.Router()

        server.use('/oapi', openApi)

        const AuthService = require('../api/user/authService')
          openApi.post('/login', AuthService.login)
          openApi.post('/singup', AuthService.singup)
          openApi.post('/validateToken', AuthService.validateToken)
}