const _ = require('lodash')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('./user')
const env = require('../../.env')

const emailRegex =  /\S+@\S+\.\S+/
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/

const sendErrorsFromDB = (res, dbErrors) =>{

    const errors = []

    _.forIn(dbErrors.errors, error => errors.push(error.message))
    
    return res.status(400).json({errors}) 
}

//MÉTODO DE LOGIN

const login = (req, res, next) =>{

    const email = req.body.email || '' //email que foi enviado
    const password = req.body.password || '' //senha que foi enviada

    User.findOne({email}, (err,user) => { //faz uma busca de um usuário dentro da coleção de usuários

        if(err) {

            return sendErrorsFromDB(res,err)

        }else if (user && bcrypt.compareSync(password, user.password)){ //pega a senha enviada e compara com a senha do user de maneira assincrona
            const token = jwt.sign(user, env.authSecret,{ // gera o token 
                expiresIn:"1 day"
            })
            const {name, email} = user
            res.json({name,email, token}) // gera um objeto com o nome, email e o token

        }else{
            return res.status(400).send({errors: ['Usuário/Senha inválidos'] })
        }  
    })
}

//Método ValidateToken, para sessões de usuário.

const validateToken = (req,res,next) => {

    const token = req.body.token || '' //recebe o token
    jwt.verify(token, env.authSecret, function(err, decoded){ // se não retornar erro retorna o valido = true
        return res.status(200).send({valid:!err})
    })
}

//MÉTODO SINGUP

const singup = (req,res,next) =>{

    const name = req.body.name || ''
    const email = req.body.email || ''
    const password = req.body.password || ''
    const confirmPassword = req.body.confirm_password || ''

    if(!email.match(emailRegex)){
        return res.status(400).send({errors: ['O email informado está inválido']})
    }
    if(!password.match(passwordRegex)){
        return res.status(400).send({errors: ['Senha precisar ter: uma letra maiúscula, uma letra minúscula, um número, um caracte especial e tamnaho entre 6-20.']})
    }

    const salt = bcrypt.genSaltSync()
    const passwordHash = bcrypt.hashSync(password, salt) //gera a hash para a senha

    if(!bcrypt.compareSync(confirmPassword,passwordHash)){
        return res.status(400).send({errors: ['Senhas não conferem.']}) //compara as senhas
    }

    User.findOne({email}, (err,user) =>{ // ve se o usuário já existe

        if(err){
            return sendErrorsFromDB(res,err)
        } else if(user) {
            return res.status(400).send({errors : ['Usuário já Cadastrado.']})
        } else{
            const newUser = new User({name, email, password: passwordHash})
            newUser.save(err =>{
                if(err){
                    return sendErrorsFromDB(res,err)
                }else{
                    login(req,res,next)
                }
            })
        } 

    })
}

module.exports = {login, singup, validateToken}