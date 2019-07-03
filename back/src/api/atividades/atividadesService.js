const Atividades = require('./atividades')

Atividades.methods(['get', 'post', 'put', 'delete'])
Atividades.updateOptions({new:true, runValidators: true})

module.exports = Atividades