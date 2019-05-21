var express = require('express');
var router = express.Router();
User = require('../models/userDAO')


//-------------------------------------LOGIN
router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', (req, res) => {
    let login = req.body.login,
        password = req.body.password;
    let userFound = null;
    if(login == "null" || password == "null")
        return res.status(404).send({error: "Campo nulo identificado"});
   
    User.get().then((users) => {
        users.forEach(function (user){
        
            if (login == user.login && password == user.password){
                userFound = user;
            }
        });
        if (userFound != null ){
            console.log("Logado com sucesso");
            res.cookie('login', login);
            res.redirect('/');
            return;
        }else {
            res.status(403);
            return res.status(403).send({error: "Credenciais não encontradas"});
        }
    });
});

//--------------------------------Acessar registrar
router.get('/register', (req, res)=>{
    res.render('registerUser')
});
//----------------------------------Registrar
router.post('/register', (req, res)=>{
    let login = req.body.login,
        password = req.body.password;
        if(login == "null" || password == "null")
            return res.status(404).send({error: "Campo nulo identificado"});

        User.get().then((users) => {
            users.forEach(function (user){
                if (login == user.login){
                    return res.status(400).send({error: "Esse usuário já existe."});
                }
            });
            User.insert(login, password);
            console.log("Novo usuário cadastrado");
            res.redirect('/');
        });
});
//------------------------------------Logout
router.get('/logout', function (req,res){
    res.clearCookie('login');
    res.redirect('/');
});

module.exports = router;