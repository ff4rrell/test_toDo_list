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
    res.send(todoList)
})

app.get('/todo/:id', ( req, res) => {
    const idTodo = req.params.id;
    const todo = todoList.find( it => {
        if(it.id === Number(idTodo)){
            return it
        }
    }) || {};
    res.send(todo)
})



app.delete('/todo/:id', (req, res) => {
    const todoIdToDelete = req.params.id

    todoList = todoList.filter( todo => todo.id !== Number(todoIdToDelete))
    res.send(todoList)

})

app.put('/todo', (req,res) => {
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


