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
            db.collection('list').find().toArray((err, list) => {
                if(err) {throw err}
                else{
                    callback(list)
                }
            })
        })
    }

    static createList(name){
        ListDAO.connect((db) => {
            db.collection('list').insertOne({
                'name': name,
                'activities': []
            })
        })
    }

    static addActivity(list, activity){
        ListDAO.connect((db) => {
            db.collection('list').updateOne(
                {name: list},
                {$addToSet: {activities: [activity]}}
            )
        })
    }
}