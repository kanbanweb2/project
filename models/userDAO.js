let mongo = require('mongodb').MongoClient;

module.exports = class UserDAO {
    static connect(callback){
        return mongo.connect('mongodb://localhost:27017',
        {
            useNewUrlParser: true
        });
        
    }

    static get (callback) {
        return UserDAO.connect().then((conn) => {
            let db = conn.db('kanban');
            return db.collection('user').find().toArray();
        });
    }

    static insert (login, senha) {
        return UserDAO.connect().then((conn) => {
            let db = conn.db('kanban');
            db.collection('user').insertOne({login: login, senha: senha});
        });    
    }

    static getOne (login) {
        return User.connect().then((conn) => {
            let db = conn.db('kanban');
            return db.collection('user').find({"login": login});
        });
    }
}

/*const mongoose = require('../database');

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
module.exports = User;*/