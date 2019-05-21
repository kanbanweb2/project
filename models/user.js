const mongoose = require('../database');


const UserSchema = new mongoose.Schema({
    login: { 
        type: String, 
        unique: true, //unicidade de login
        required: true 
    },
    password: { 
        type: String, 
        required: true, 
        select: false //para quando for retornar a lista de usuários, a senha não retornar junto
    }
});

var User = mongoose.model('User', UserSchema);
module.exports = User;