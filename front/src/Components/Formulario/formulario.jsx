import React from 'react'
import './formulario.css'

export default props => (
    <div role="form" className="todoForm">
        <div className="col-md-10">
            <input id="name" className="form-control" 
                placeholder="Nome da Atividade" 
                value={props.activityName}
                onChange={props.handleChangeName}></input>
            <input id="lista" className="form-control" 
                placeholder="Lista da Atividade" 
                value={props.listName}
                onChange={props.handleChangeList}></input>
        </div>
        <div className="col-md-2">
            <button className="btn btn-primary" onClick={props.handleAdd}>OK!</button>
        </div>
    </div>
)