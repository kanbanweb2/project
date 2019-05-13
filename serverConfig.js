let express = require('express')
    app = express()
    path = require('path')
    bodyParser = require('body-parser')
    cookieParser = require('cookie-parser')
    db = require('./mongod')


app.use(express.static(path.join(__dirname,'public')))
app.set('view engine', 'hbs')
app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: true}))

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', (req, res) => {
    res.cookie('login', req.body.login)
    res.redirect('/')
})

app.post('/list', (req, res) => {
    db.createList(req.body.list)
    res.redirect('/')
})

app.post('/activity', (req, res) => {
    db.addActivity(req.body.list, req.body.activity)
    res.redirect('/')
})

app.get('/', (req, res) => {
    if(req.cookies && req.cookies.login){
        db.read((list) => {
            res.render('index', {user:req.cookies.login, list:list})
        })
    }else{
        res.render('login')
    }
})

app.listen(8000, ()=> {
    console.log("Server is up, port 8000")
})