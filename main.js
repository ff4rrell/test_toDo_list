const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");

app.use(cors());
app.use(express.json());

const FILTERS = {
  all: "all",
  active: "active",
  completed: "completed",
};

///////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

class Todo {
  constructor(title, completed = false, id) {
    this.title = title;
    this.completed = completed;
    this.id = id;
  }
}

// TodoManager
/////////////////////////////////////////////////////////////////////////////////
class TodoList {
  constructor() {
    this.todoList = [];
    this.idCounter = 0;
  }

  addTodo(title) {
    if (title && !this.findTodo(title)) {
      this.todoList.push(new Todo(title, undefined, ++this.idCounter));
    }
  }

  deleteTodo(id) {
    this.todoList = this.todoList.filter((it) => it.id !== id);
  }

  dltAllcompletedTodo() {
    this.todoList = this.todoList.filter((it) => !it.completed);
  }

  findTodo(title) {
    return this.todoList.find((it) => it.title === title);
  }

  changeCompleted(id) {
    const todo = this.findTodoforId(id);
    todo.completed = !todo.completed;
  }

  findTodoforId(id) {
    return this.todoList.find((it) => it.id === id);
  }

  sortTodoListForCompeted(filter) {
    return this.todoList.filter(({ completed }) => {
      switch (filter) {
        case FILTERS.all:
          return true;
        case FILTERS.active:
          return !completed;
        case FILTERS.completed:
          return completed;
      }
    });
  }
}

const todoList = new TodoList();

app.get("/", (req, res) => {
  res.send("Hello Novus Ordo Seclorum");
});

app.get("/todo", (req, res, next) => {
  const filter = req.query.filter;

  if (!filter) {
    res.send(todoList.todoList);
  }

  if (!isNaN(Number(filter))) {
    return next();
  }

  const filterTodoList = todoList.sortTodoListForCompeted(filter) || {};

  res.send(filterTodoList);
});

app.get("/todo/counterActiveTodo", (req, res) => {
  const counterActiveTodo = todoList.todoList.filter( it => !it.completed)
  res.send(String(counterActiveTodo.length));
});

app.get("/todo/:id", (req, res) => {
  const idTodo = req.params.id;
  const todo = todoList.findTodoforId(Number(idTodo)) || {};
  res.send(todo);
});

app.delete("/todo/completedTodo", (req, res) => {
  todoList.dltAllcompletedTodo();

  res.send(todoList.todoList);
});

app.delete("/todo/:id", (req, res) => {
  const todoIdToDelete = Number(req.params.id);

  todoList.deleteTodo(todoIdToDelete);

  res.send(todoList.todoList);
});

app.put("/todo/", (req, res) => {
  const newTodoTitle = req.body.title;

  todoList.addTodo(newTodoTitle);

  res.send(todoList.todoList);
});

app.post("/todo/:id", (req, res) => {
  const todoId = Number(req.params.id);

  todoList.changeCompleted(todoId);

  res.send(todoList.todoList);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
