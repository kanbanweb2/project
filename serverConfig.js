let express = require('express')
    app = express()
    path = require('path')
    bodyParser = require('body-parser')
    cookieParser = require('cookie-parser')

    var userRouter = require('./routes/user');
    //var listRouter = require ('./routes/list');

    db = require('./models/listANDactivity')
    User = require('./models/userDAO')
    


app.use(express.static(path.join(__dirname,'public')))
app.set('view engine', 'hbs')
app.use(cookieParser()); //lidando com cookies

app.use(bodyParser.urlencoded({extended: false}))


app.use('/', userRouter);


//------------------------------------Listas e Activities

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

//-------------------------------------------VERIFICAR SE HÁ COOKIE ATIVO
app.get('/', (req, res) => {
    if(req.cookies && req.cookies.login){
        db.read(req.cookies.login, (list) => {
            res.render('index', {user:req.cookies.login, list:list})
        })
    }else{
        res.render('login')
    }
})

app.listen(process.env.PORT || 8000, ()=> {
    console.log("Server is up, port 8000")
})