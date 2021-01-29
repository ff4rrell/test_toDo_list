import React from 'react';


const RenderFilterTodoList = (props) => {
    return (
        <div>
            {props.todoList.map( it => {
                return(
                    <div key={it.id}>
                        title: {it.title} id: {it.id} 
                        <button onClick={()=> props.changeCompleted(it.id)}> {it.completed ? "notDone" : "Done"}</button> 
                        <button onClick={()=> props.deleteTodo(it.id)}>DEL</button>
                    </div>
                )
            })}  
        </div>
    )
}


export default RenderFilterTodoList;