let express = require('express')
    app = express()
    path = require('path')
    bodyParser = require('body-parser')
    cookieParser = require('cookie-parser')
    db = require('./models/listANDactivity')
    User = require('./models/user')
    //router = express.Router(); *se for para usar rota


app.use(express.static(path.join(__dirname,'public')))
app.set('view engine', 'hbs')
app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: true}))
//-------------------------------------LOGIN
app.get('/login', (req, res) => {
    res.render('login')
})

require('./controllers/authController')(app);
//-----------------------------------------REGISTER


app.post('/list', (req, res) => {
    db.createList(req.body.list, req.cookies.login)
    res.redirect('/')
})

app.post('/activity', (req, res) => {
    db.addActivity(req.body.list, req.body.activity, req.cookies.login)
    res.redirect('/')
})

app.post('/transfer', (req, res) => {
    db.alterActivity(req.body.list, req.body.activity, req.cookies.login)
    res.redirect('/')
})

app.get('/', (req, res) => {
    if(req.cookies && req.cookies.login){
        db.read(req.cookies.login, (list) => {
            res.render('index', {user:req.cookies.login, list:list})
        })
    }else{
        res.render('login')
    }
})

app.listen(8000, ()=> {
    console.log("Server is up, port 8000")
})