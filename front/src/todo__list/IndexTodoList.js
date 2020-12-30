import React, {useState, useEffect} from 'react';



const IndexTodoList = () => {
    const [todoList, setTodoList] = useState([]);
    const [newTodoTitle, setNewTodoTitle] = useState('');
    const [status, setStatus]= useState('all');
    const [count, setCount] = useState(0);
    

    useEffect(() => {
        fetch('http://localhost:3001/todo')
            .then( todo => todo.json())
            .then(todoListFromServer => setTodoList((todoListFromServer)));
    }, [])

    const deleteTodo = (id) => {
        fetch(`http://localhost:3001/todo/${id}`, {
            method: 'delete'
        }).then( todo => todo.json())
          .then(todoListFromServer => setTodoList((todoListFromServer)));
    };

    const addNewTodo = () => {
        setNewTodoTitle('')
        fetch('http://localhost:3001/todo', {
            method: 'put',
            body: JSON.stringify({title: newTodoTitle}),
            headers: {
                'content-type': 'application/json'
            }
        }).then(todo => todo.json())
          .then(todoListFromServer => setTodoList((todoListFromServer)));
    }

    const changeCompleted = (id) => {
        fetch(`http://localhost:3001/todo/${id}`, {
            method: 'post'
        }).then(it => it.json())
          .then(todoListFromServer => setTodoList((todoListFromServer)))
    }

    const allStatus = () => {
        setStatus('all')
    };

    const completedStatus = () => {
        setStatus('completed')
    };

    const activeStatus = () => {
        setStatus('active')
    };
    

    if((((todoList.filter( it => !it.completed)).length)  !== count) ){
        if((((todoList.filter( it => !it.completed)).length) < count) ){
            setCount(0);
            console.log("-")
        }else{
        todoList.map(item => {
            if(!item.completed){
                setCount(count + 1);
                console.log("+");
            }
       
        })
        }
    }
  
    
    return(
        <div>
            
            Active Todo: {count}
            
                <div><button onClick={()=> {console.log(todoList)}}>console.log</button></div>
                

            <input type='text' value={newTodoTitle} onChange={event => setNewTodoTitle(event.target.value)}/>
            <button onClick={addNewTodo}>add new todo</button>

            <div>
                <button onClick={allStatus}>ALL</button> 
                <button onClick={activeStatus}>active</button>
                <button onClick={completedStatus}>completed</button>
            </div>

            {todoList.map( it => {

                
                if(status === 'active' && !it.completed){
                    
                    return (
                        <div key={it.id}>
                            <div>
                                title: {it.title}  id: {it.id}  <button onClick={()=> changeCompleted(it.id)}> {it.completed ? "done" : "notDone"}</button>
                            </div>
                    
                                <button onClick={()=> deleteTodo(it.id)}>DEL</button>
                                <div>==========================</div>
                                
                        </div>
                    )
                }else if(status === 'completed' && it.completed ){
                    return (
                        <div key={it.id}>
                            <div>
                                title: {it.title} id: {it.id}  <button onClick={()=> changeCompleted(it.id)}> {it.completed ? "done" : "notDone"}</button>
                            </div>
                    
                                <button onClick={()=> deleteTodo(it.id)}>DEL</button>
                                <div>==========================</div>
                        </div>
                    )
                }else if(status === 'all'){
                    return(
                        <div key={it.id}>
                            <div>
                                title: {it.title} id: {it.id}  <button onClick={()=> changeCompleted(it.id)}> {it.completed ? "done" : "notDone"}</button>
                            </div>
                    
                                <button onClick={()=> deleteTodo(it.id)}>DEL</button>
                                <div>==========================</div>
                        </div>
                    )
                }

            })}
            
            
        </div>
    )
};


export default IndexTodoList;
