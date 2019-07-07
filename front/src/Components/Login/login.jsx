import React from 'react'
import './login.css'

export default (props) => {
    return (
        <div class="container">
        <div class="form-group">
            <h1> Login</h1>
            <form action="/login" method="POST">
                <input type="text" name="login" id="login" value="" placeholder="Login" required class="form-control"></input>
                <input type="password" name="password" id="password" value="" placeholder="Senha" required class="form-control"></input>

                <input type="submit" id="submit" value="Entrar" class="btn btn-primary"></input>
            </form>
            <form  action="/register" method="GET">
                <input type="submit" id="submit" value="Cadastrar usuario" class="btn btn-primary"></input>
            </form>        
        </div>
    </div>
    )
}