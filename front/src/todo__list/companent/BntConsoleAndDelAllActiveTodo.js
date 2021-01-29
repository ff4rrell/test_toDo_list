import React from 'react';


const BntConsoleAndDelAllActiveTodo = (props) => {
    return(
        <div><button onClick={()=> {console.log(props.todoList)}}>console.log1</button>
        <button onClick={props.dltAllActiveTodo}>DEL comp-d Todo</button></div>
    )

}


export default BntConsoleAndDelAllActiveTodo;