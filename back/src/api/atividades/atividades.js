const restful = require('node-restful')
const mongoose = restful.mongoose

const atividadesSchema = new mongoose.Schema({
    name:{type: String, required: true},
    lista:{type: String, required: true},
    user:{type: String, required: true}
})

module.exports = restful.model('Atividades', atividadesSchema)