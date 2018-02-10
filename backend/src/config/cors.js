// como estamos rodando o frontend e o backend em portas diferentes, temos que ter o cors liberado para permitir requisições vindas de outros lugares

module.exports = (req, res, next) =>{
    
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next()
}