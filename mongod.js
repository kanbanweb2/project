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

    static read(cookieUser, callback){
        console.log(cookieUser)
        ListDAO.connect((db) => {
            db.collection('list').find({
                user:  cookieUser//Arrumar referencia
            }).toArray((err, list) => {
                if(err) {throw err}
                else{
                    callback(list)
                }
            })
        })
    }

    static createList(name, userCookie){
        ListDAO.connect((db) => {
            db.collection('list').insertOne({
                'name': name,
                'activities': [],
                'user': userCookie
            })
        })
    }

    static addActivity(list, activity, userCookie){
        ListDAO.connect((db) => {
            db.collection('list').updateOne(
                {name: list,
                user:userCookie},
                {$addToSet: {activities: [activity]}}
            )
        })
    }

    // static alterActivity(){
    //     ListDAO.connect('list')
    // }
}