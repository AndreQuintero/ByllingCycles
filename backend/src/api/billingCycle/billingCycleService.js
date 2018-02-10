const BillingCycle = require('./billingCycle')
const errorHandler = require('../common/errorHandler')

// API RESTFUL

BillingCycle.methods(['get','post','put','delete'])
BillingCycle.updateOptions({new: true, runValidators: true})

// MIDDLEWARE CRIADO PARA MOSTRAR OS ERROS

BillingCycle.after('post',errorHandler).after('put', errorHandler)


//cria a rota de COUNT do BD

BillingCycle.route('count',(req,res,next) => { //'count' é o url 
    
    BillingCycle.count((error, value)=>{//pega a qnt de elementos na tabela
        if(error){
            res.status(500).json({errors:[error]})
        }else{
             res.json({value})
        }
    })
})

//CRIA A ROTA DE SUMMARIO

BillingCycle.route('summary',(req,res,next) =>{
    
    BillingCycle.aggregate({   // aggregate recebe vários parametros
        
        //aquilo que eu quero projetar ou extrair de dentro do objeto, no caso, ciclo de pagamento
        $project: {credit: {$sum: "$credits.value"}, debt:{$sum: "$debts.value"}} // terá um atributo crédito que é a soma dos valores dos créditos do banco e um de débito
    },  {
        
        //agrupa os valores em algum tipo de critério
        $group: {_id: null, credit: {$sum: "$credit"}, debt:{$sum:"$debt"}} //id é obrigatório no group, credit não é o mesmo do de cima, já $credit sim 
    },
         {
            $project:{_id:0,credit:1, debt:1}  //false, true,true
    },
        (error, result) => {
            if(error){
            res.status(500).json({errors:[error]})
        }else{
             res.json(result[0] || {credit:0, debt: 0}) 
        }
    })
})

module.exports = BillingCycle