import React, { Fragment } from 'react'

export default props => {

    const list = props.list || []
    const unicidade = []
    const renderHeaders = () => {

        list.forEach(element => {
            if(unicidade.indexOf(element.lista)===-1){
                unicidade.push(element.lista)
            }
        });

        return unicidade.map(listas => (
            <div className="col-md-6">
                <h2>{listas}</h2>
                {renderRows(listas)}
            </div>
        ));
    }

    const renderRows = (lista) => {
        let atividades = []
        list.forEach(element => {
            if(element.lista===lista){
                atividades.push({atividade:element.name, id:element._id})
            }
        });
        
        return(
            atividades.map(element => (
                <div className="row">
                    <p>{element.atividade}</p>
                    <button onClick={()=>props.handleDeleteObj(element)}>apagar</button>
                    <button onClick={() => {
                        var destido = prompt("Escolha o destido")
                        props.handleMoveObj(element, destido)
                    }}>mover</button>
                </div>
            ))
        )
    }

    return (
        <Fragment>
            <div className="container">
                <div className="row">
                    {renderHeaders()}
                </div>
            </div>
        </Fragment>
    )
    
}