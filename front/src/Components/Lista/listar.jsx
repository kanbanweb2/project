import React from 'react'

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
            <th>{listas}</th>
            
        ))
    }

    const renderRows = () => {
        console.log(list)
        return unicidade.map(element => (
            // if(list.lista == unicidade)(
                // console.log(list.lista)
                <tr key={list._id}>
                    <td>{list.name}</td>
                </tr>

            // )
        ))
    }


    return(
        <table className='table'>
            <thead>
                <tr>
                    {renderHeaders()}
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    )
}