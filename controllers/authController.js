let express = require ('express');
let User = require('../models/user');
let router = express.Router();

router.post('/register', async (req,res) =>{
    let {login} = req.body;

try{
    if (await User.findOne({login}))
        return res.status(400).send({error: "Esse usuário já existe."});

    const user = await User.create(req.body);
    
    user.password = undefined; //para não retornar as senhas dos usuários

    return res.send({user});
} catch (err) {
    return res.status(400).send({error: "Erro no Cadastro do Usuário"});
}

});

router.get('/logout', function(req, res){
    delete req.session.login;
    res.redirect('/');
  });

module.exports = (app) => app.use('/auth', router);