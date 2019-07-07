const restful = require('node-restful')
const mongoose = restful.mongoose

const usuarioSchema = new mongoose.Schema({
    user:{type: String, required: true},
    password:{type: String, required: true}
})

module.exports = restful.model('Usuario', usuarioSchema)