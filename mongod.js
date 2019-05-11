let mongo = require('mongodb').MongoClient

module.exports = class ListDAO{
    static connect(callback){
        mongo.connect('mongodb://localhost:27017',
        {
            useNewUrlParser: true
        }, (err, conn) => {
            if(err) {throw err}
            else{
                let db = conn.db('kanbam')
                callback(db)
            }
        })
    }

    static read(callback){
        ListDAO.connect((db) => {
            db.collection('kanbam').find().toArray((err, list) => {
                if(err) {throw err}
                else{
                    callback(list)
                }
            })
        })
    }

    static create(name){
        ListDAO.connect((db) => {
            db.collection('kanbam').insertOne({
                'name': name,
                'activities': []
            })
        })
    }
}