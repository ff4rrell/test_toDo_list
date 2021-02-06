import React from 'react';


const Input = (props) => {

    return (
        <div>
            <input type='text' value={props.newTodoTitle} onChange={event => props.setNewTodoTitle(event.target.value)}/>
            <button onClick={props.addNewTodo}>add new todo</button>
        </div>
    )
}

export default Input