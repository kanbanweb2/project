let mongo = require('mongodb').MongoClient
//verificar de usar a referencia e conexão no database 
module.exports = class ListDAO{
    static connect(callback){
        mongo.connect('mongodb://localhost:27017',
        {
            useNewUrlParser: true
        }, (err, conn) => {
            if(err) {throw err}
            else{
                let db = conn.db('kanban')
                callback(db)
            }
        })
    }

    static read(cookieUser, callback){
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
                {$addToSet: {activities: activity}}
            )
        })
    }

    static removeActivity(activity, userCookie){
        ListDAO.connect((db) => {
            db.collection('list').find({
                activities:{$in:[activity]}
            }).toArray((err, result) => {
                if(err) throw err
                else{
                    db.collection('list').updateOne(
                        {
                            name: result[0].name,
                            user: userCookie
                        },{
                            $pull:{
                                activities:{$in:[activity]}
                            }
                        }
                    )
                }
            })
        })
    }

    static alterActivity(list, activity, userCookie){
        ListDAO.removeActivity(activity, userCookie)
        ListDAO.addActivity(list, activity, userCookie)
    }
}