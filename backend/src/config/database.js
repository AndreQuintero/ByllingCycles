const mongoose = require('mongoose')// requisita o mongo
mongoose.Promise = global.Promise //pega a api de promise do node e atribui essa api ao mongoose.promise/ evita alguns warnings
module.exports = mongoose.connect('mongodb://localhost/mymoney')


mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório"
mongoose.Error.messages.Number.min = "O '{VALUE}' informado é menor que o limite mínimo '{MIN}'."
mongoose.Error.messages.Number.max= "O '{VALUE}' informado é maior que o limite máximo '{MAX}.'"
mongoose.Error.messages.String.enum = "O '{VALUE}' não é válido para o atributo '{PATH}'"
