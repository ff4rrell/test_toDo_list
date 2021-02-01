const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');

app.use(cors());
app.use(express.json());


let idCounter = 0;

class Todo {
    constructor(title, completed = false, id = ++idCounter){
        this.title = title;
        this.completed = completed;
        this.id = id;
    }
}


let todoList = []

app.get('/', (req, res)=> {
    res.send('Hello Novus Ordo Seclorum')
});


app.get('/todo', (req, res) => {
    
    const filter = req.query.filter

    if(filter){
        
            if(!isNaN(Number(filter))){
                return next();
            }

    console.log(req.query.filter)

    let filterTodoList = todoList.filter( it => {
        if(filter === 'all'){
            return it
        }else if((filter === 'active') && !it.completed ){
            return it
        }else if((filter === 'completed') && it.completed){
            return it
        }
    }) || {}


    res.send(filterTodoList)

    }

    res.send(todoList)
    
})




app.get('/todo/:id', (req, res) => {
    const idTodo = req.params.id;

    const todo = todoList.find( it => {
        return it.id === Number(idTodo)
    }) || {}
    res.send(todo)
})


app.delete('/todo/:id', (req, res) => {
    const todoIdToDelete = req.params.id

    todoList = todoList.filter( todo => todo.id !== Number(todoIdToDelete));
    if( todoIdToDelete === "completedTodo"){
        todoList = todoList.filter( todo => !todo.completed)
    }
    
    res.send(todoList)


})

app.put('/todo/', (req,res) => {
    const newTodoTitle = req.body.title;

    if(newTodoTitle && !todoList.find(it => it.title === newTodoTitle)){
        todoList = [...todoList, new Todo(newTodoTitle)]
    }
    res.send(todoList)
})

app.post('/todo/:id', ( req, res) => {
    const todoId = req.params.id

    todoList.map( item => {
        if(item.id === Number(todoId)){
            item.completed = !item.completed
        }
    })
    res.send(todoList)
})



app.listen(port, ()=> {
    console.log(`Server is running at http://localhost:${port}`);
});




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