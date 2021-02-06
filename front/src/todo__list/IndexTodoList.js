import React, {useState, useEffect} from 'react';
import ButtonFilter from './companent/ButtonFilter';
import RenderFilterTodoList from './companent/RenderFilterTodoList';
import BntConsoleAndDelAllActiveTodo from './companent/BntConsoleAndDelAllActiveTodo';
import Clock from './companent/Clock';
import Input from './companent/Input'


const IndexTodoList = () => {
    const [todoList, setTodoList] = useState([]);
    const [newTodoTitle, setNewTodoTitle] = useState('');
    const [status, setStatus]= useState('all');
    const [counterActiveTodo, setCounterActiveTodo] = useState((todoList.filter(it=> !it.completed).length));
    ////////////////////////////////////////////////////////////////////////////////////////////////

    const PATH = {
        all: 'all',
        active: 'active',
        completed: 'completed',
        completedTodo: 'completedTodo'
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////

    const getAtiveTodo = () => {
        fetch('http://localhost:3001/todo')
            .then( response => response.json())
            .then( todoListFromServer => setCounterActiveTodo((todoListFromServer.filter( item => !item.completed).length)))
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(()=>{
        getAtiveTodo()
        console.log("toyota")
    }, [todoList])
    ////////////////////////////////////////////////////////////////////////////////////////////////

    
    const getTodoListFromServer = () => {
        fetch(`http://localhost:3001/todo?filter=${status}`, {
            method: 'get'
        }).then(it => it.json())
          .then(todoListFromServer => setTodoList((todoListFromServer)) )
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        getTodoListFromServer();
        getAtiveTodo();
    }, [status]);
    ////////////////////////////////////////////////////////////////////////////////////////////////

    const deleteTodo = (id) => {
        fetch(`http://localhost:3001/todo/${id}`, {
            method: 'delete'
        }).then( todo => todo.json())
          .then(() => getTodoListFromServer());
       
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////

    const addNewTodo = () => {
        setNewTodoTitle('')
        fetch('http://localhost:3001/todo', {
            method: 'put',
            body: JSON.stringify({title: newTodoTitle}),
            headers: {
                'content-type': 'application/json'
            }
        }).then(todo => todo.json())
          .then(() => getTodoListFromServer());
          
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////

    const changeCompleted = (id) => {
        fetch(`http://localhost:3001/todo/${id}`, {
            method: 'post'
        }).then(it => it.json())
          .then(() => getTodoListFromServer());
        getAtiveTodo();
          
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////

    const allStatus = () => {
        setStatus(PATH.all);
        
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////

    const activeStatus = () => {
        setStatus(PATH.active);
        
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////

    const completedStatus = () => {
        setStatus(PATH.completed); 
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////

    const deleteCompletedTodo = () => {
        fetch(`http://localhost:3001/todo/${PATH.completedTodo}`, {
            method: 'delete'
        })
            .then(todo => todo.json())
            .then(() => getTodoListFromServer())
        console.log("it's work")
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////

    
    
    return(
        <div>
        
        <Clock/>

        Active Todo:  {counterActiveTodo} 

        <BntConsoleAndDelAllActiveTodo todoList={todoList} 
                dltAllActiveTodo={deleteCompletedTodo}
        />


        <Input newTodoTitle={newTodoTitle} setNewTodoTitle={setNewTodoTitle} 
                addNewTodo={addNewTodo}
        />


        <ButtonFilter allStatus={allStatus} activeStatus={activeStatus} 
                completedStatus={completedStatus} 
        />

        <RenderFilterTodoList todoList={todoList} changeCompleted={changeCompleted} 
                deleteTodo={deleteTodo}

        />    
        
            
        </div>
    )
};


export default IndexTodoList;
