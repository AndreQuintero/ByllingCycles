
 // chama a api restful do node e o schema do mongo
const restful = require('node-restful')
const mongoose = restful.mongoose  

const userSchema = new mongoose.Schema({

    //TABELA USUÁRIO
    name: {type:String,required:true},
    email: {type:String, required: true},
    password: {type:String, min:6, max:12 ,required:true }

})

module.exports = restful.model('User',userSchema)