import React, {Component, Fragment} from 'react'
import './painel.css'
import axios from 'axios'

import Formulario from '../Formulario/formulario'
import Lista from '../Lista/listar'

const URL = 'http://localhost:3003/api/atividades'

export default class Painel extends Component {

    constructor(props){
        super(props)
        this.state = {activityName:'', listName:'', list:[], user:'lucas'} //usuario predefinido por ainda n ter feito o sistema de login

        this.reflesh()
    }

    reflesh(){
        axios.get(URL).then(resp => this.setState({...this.state, activityName:'', list:resp.data}))
    }

    handleAdd(){
        axios.post(URL, {user:this.state.user, lista: this.state.listName, name: this.state.activityName}).then(
            rest => console.log('Atividade adicionada')
        )
    }

    handleChangeName(e){
        this.setState({...this.state, activityName: e.target.value})
    }

    handleChangeList(e){
        this.setState({...this.state, listName:e.target.value})
    }

    render() {
        return(
            <Fragment>
                <header className="page-header">
                    <h2>Esse todo, todo, todo aqui dentro</h2>
                </header>
                <Formulario
                    handleChangeName = {this.handleChangeName.bind(this)}
                    handleChangeList = {this.handleChangeList.bind(this)} 
                    handleAdd = {this.handleAdd.bind(this)}
                    activityName = {this.state.activityName}
                    listName = {this.state.listName}
                    ></Formulario>
                <Lista list={this.state.list} user={this.state.user} url={URL}></Lista>
            </Fragment>
        )
    }
}