//cria a conexão com o bd
const mongoose = require ('mongoose');


mongoose.createConnection('mongodb://localhost/kanban', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;