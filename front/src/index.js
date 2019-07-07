import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

/*
*
* Rotas normais, verificar o uso do cookie, implementar login por cookie após resolver o que se sabe ;)
*
*/
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './Components/Login/login'

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/login" component={Login}></Route>
            <Route path="*" component={App}></Route>
            
            <App />
        </Switch>
    </BrowserRouter>, document.getElementById('root')
);

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
