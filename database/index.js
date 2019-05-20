//cria a conexão com o bd
const mongoose = require ('mongoose');

mongoose.connect('mongodb://localhost/kanban'), {useMongoClient: true}; //mongoCLiente é uma forma de conectar com o mongo
mongoose.Promise = global.Promise;

mondule.exports = mongoose;