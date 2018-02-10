//VALIDA O TOKEN

const jwt = require('jsonwebtoken')
const env = require('../.env')

module.exports = (req,res, next) => {

        //CORS preflight request
        if(req.method === 'OPTIONS'){ //SE ELE TEM O CORS ELE CONTINUA
            next() // próximo filtro
        }else{
            const token = req.body.token || req.query.token || req.headers['authorization']

            if(!token){
                return res.status(403).send({errors : ['No token provide']})
            }

            jwt.verify(token, env.authSecret, function(err, decoded){ // ve se o token é válido
                if(err){
                    return res.status(403).send({erros: ['Failed to authenticate token.']})
                }else{
                    req.decoded = decoded
                    next()
                }
            })
        }
}