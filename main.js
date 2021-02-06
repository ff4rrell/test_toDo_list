const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');

app.use(cors());
app.use(express.json());


let idCounter = 0;

const PATH = {
    all: 'all',
    active: 'active',
    completed: 'completed',
    completedTodo:'completedTodo'
}

///////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
// 
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

class Todo {
    constructor(title, completed = false, id = ++idCounter){
        this.title = title;
        this.completed = completed;
        this.id = id;
    }
}

// TodoManager
/////////////////////////////////////////////////////////////////////////////////
class TodoList {
    constructor(){
        this.todoList = []
    }
    /////////////////////////////////////////////////////////////////////////////////
    addTodo(title){
        if(title && !this.todoList.find(it => it.title === title)){
            this.todoList.push(new Todo(title))
        }
    }
    /////////////////////////////////////////////////////////////////////////////////
    deleteTodo(id){
        this.todoList = this.todoList.filter(it => it.id !== id)
    }
    dltAllcompletedTodo(){
        this.todoList = this.todoList.filter(it => !it.completed)
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////
    findTodo(title){
        return this.todoList.find(it => it.title === title)
    }
    /////////////////////////////////////////////////////////////////////////////////
    changeCompleted(id){
        this.todoList.find( it => {
            if(it.id === id){
                it.completed = !it.completed
            }
        })
    }
    /////////////////////////////////////////////////////////////////////////////////
    findTodoforId(id){
        
        return this.todoList.find(it => it.id === id)
    }
    /////////////////////////////////////////////////////////////////////////////////
    sortTodoListForCompeted(filter, path){
        return this.todoList.filter( it => {
            if(filter === path.all){
                return it
            }else if((filter === path.active) && !it.completed ){
                return it
            }else if((filter === path.completed) && it.completed){
                return it
            }
        });
    }

}

////////////////////////////////////////////////////////////////////////////////////////////////



let todoList = new TodoList()

////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/', (req, res)=> {
    res.send('Hello Novus Ordo Seclorum')
});

////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/todo', (req, res) => {
    
    const filter = req.query.filter
    //////////////////////////////////////////////////////////////////////////////////
    if(filter){
                                                                             
        ////////////////////////////////////                                        //        
            if(!isNaN(Number(filter))){   //                                        //
                return next();            //                                        //
            }                             //                                        //
        ////////////////////////////////////   
                                             
    let filterTodoList = todoList.sortTodoListForCompeted(filter, PATH) || {}       //
                                                                                    //
    res.send(filterTodoList)                                                        //
                                                                                    //
    }                                                                               //
    //////////////////////////////////////////////////////////////////////////////////
    res.send(todoList.todoList)
    
})



////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/todo/:id', (req, res) => {
    const idTodo = req.params.id;
    const todo = todoList.findTodoforId(Number(idTodo))
    res.send(todo)
})


////////////////////////////////////////////////////////////////////////////////////////////////


app.delete('/todo/:id', (req, res) => {
    const todoIdToDelete = req.params.id
    if(!isNaN(Number(todoIdToDelete))){
        todoList.deleteTodo(Number(todoIdToDelete))
    }else if(todoIdToDelete === PATH.completedTodo){
        todoList.dltAllcompletedTodo()
    }else{
        res.send("error")
    }

    res.send(todoList.todoList)
})

////////////////////////////////////////////////////////////////////////////////////////////////


app.put('/todo/', (req,res) => {
    const newTodoTitle = req.body.title;

    todoList.addTodo(newTodoTitle)

    res.send(todoList.todoList)
})

////////////////////////////////////////////////////////////////////////////////////////////////


app.post('/todo/:id', ( req, res) => {
    const todoId = req.params.id


    todoList.changeCompleted(Number(todoId))

    res.send(todoList.todoList)
})

////////////////////////////////////////////////////////////////////////////////////////////////


app.listen(port, ()=> {
    console.log(`Server is running at http://localhost:${port}`);
});

///////////////////////////////////////////////////////////////////////


/*

app.get('/test', (req, res, next) => {
    const test = req.query.filter;

    console .log(test)
    console.log(typeof(test))
    let testToyota = 'toyota';
    if(test === "all"){
        testToyota = "all"
    }else if(test === "active"){
        testToyota = "active"
    }else if(test === "completed"){
        testToyota = "completed"
    }
    res.send(testToyota)

    let err = new Error('Not Found');
    err.status = 404;
    next(err);
})


*/