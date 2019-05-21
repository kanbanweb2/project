//cria a conexão com o bd
const mongoose = require ('mongoose');

//mongoose.connect('mongodb://localhost/kanban'), {useNewUrlParser: true}; //mongoCLiente é uma forma de conectar com o mongo
mongoose.createConnection('mongodb://localhost/kanban', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;