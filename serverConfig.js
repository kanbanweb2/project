let express = require('express')
    app = express()
    path = require('path')
    bodyParser = require('body-parser')
    cookieParser = require('cookie-parser')
    db = require('./models/listANDactivity')
    User = require('./models/userDAO')
    


app.use(express.static(path.join(__dirname,'public')))
app.set('view engine', 'hbs')
app.use(cookieParser()); //lidando com cookies

app.use(bodyParser.urlencoded({extended: false}))
//-------------------------------------LOGIN
app.get('/login', (req, res) => {
    res.render('login')
})
/*
app.post('/login', function (req, res, next){
    let login = req.body.login,
    password = req.body.password;
    User.findOne({login: login, password: password}, function(err, user){
        if (err){
            console.log(err);
            return res.status(500).send({error: "Dados incorretos"});
        }
        if (!user){
            return res.status(404).send({error: "Não encontrado"});
        }
        res.cookie('login', login);
        res.redirect('/');
        res.end();
        return;
    });
});*/


app.post('/login', function (req, res, next){
    let login = req.body.login,
        password = req.body.password;
    let userFound = null;

    User.get().then((users) => {
        users.forEach(function (user){
            if (login == user.login && password == user.password){
                userFound = user;
            }
        });
        if (userFound != null ){
            res.cookie('login', login);
            res.redirect('/');
        }else {
            res.status(404);
            return res.status(404).send({error: "Não encontrado"});
        }

    });
});


app.get('/register', (req, res)=>{
    res.render('registerUser')
});

app.post('/register', (req, res)=>{
    let login = req.body.login,
        password = req.body.password;
        User.get().then((users) => {
            users.forEach(function (user){
                if (login == user.login){
                    return res.status(400).send({error: "Esse usuário já existe."});
                }
            });
            User.insert(login, password);
            res.redirect('/');
        });
});

app.get('/logout', function (req,res){
    res.clearCookie('login');
    res.redirect('/');
});

//require('./controllers/authController')(app); 
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

app.listen(8000, ()=> {
    console.log("Server is up, port 8000")
})