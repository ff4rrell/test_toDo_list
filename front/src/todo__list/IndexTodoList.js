import React, { useState, useEffect } from "react";
import ButtonFilter from "./companent/ButtonFilter";
import RenderFilterTodoList from "./companent/RenderFilterTodoList";
import BntConsoleAndDelAllActiveTodo from "./companent/BntConsoleAndDelAllActiveTodo";
import Clock from "./companent/Clock";
import Input from "./companent/Input";

const FILTERS = {
  all: "all",
  active: "active",
  completed: "completed",
};

const IndexTodoList = () => {
  const [todoList, setTodoList] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [status, setStatus] = useState(FILTERS.all);
  const [counterActiveTodo, setCounterActiveTodo] = useState(
    todoList.filter((it) => !it.completed).length
  );

  ////////////////////////////////////////////////////////////////////////////////////////////////

  const getAtiveTodo = () => {
    fetch("http://localhost:3001/todo/counterActiveTodo")
      .then((response) => response.json())
      .then((count) => setCounterActiveTodo(Number(count)));
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    getAtiveTodo();
    console.log("toyota");
  }, [todoList]);
  ////////////////////////////////////////////////////////////////////////////////////////////////

  const getTodoListFromServer = () => {
    fetch(`http://localhost:3001/todo?filter=${status}`)
      .then((it) => it.json())
      .then((todoListFromServer) => setTodoList(todoListFromServer));
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    getTodoListFromServer();
    getAtiveTodo();
  }, [status]);
  ////////////////////////////////////////////////////////////////////////////////////////////////

  const deleteTodo = (id) => {
    fetch(`http://localhost:3001/todo/${id}`, {
      method: "delete",
    })
      .then((todo) => todo.json())
      .then(() => getTodoListFromServer());
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////

  const addNewTodo = () => {
    setNewTodoTitle("");
    fetch("http://localhost:3001/todo", {
      method: "put",
      body: JSON.stringify({ title: newTodoTitle }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((todo) => todo.json())
      .then(() => getTodoListFromServer());
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////

  const changeCompleted = (id) => {
    fetch(`http://localhost:3001/todo/${id}`, {
      method: "post",
    })
      .then((it) => it.json())
      .then(() => getTodoListFromServer());
    getAtiveTodo();
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////

  const allStatus = () => {
    setStatus(FILTERS.all);
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////

  const activeStatus = () => {
    setStatus(FILTERS.active);
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////

  const completedStatus = () => {
    setStatus(FILTERS.completed);
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////

  const deleteCompletedTodo = () => {
    fetch(`http://localhost:3001/todo/completedTodo`, {
      method: "delete",
    })
      .then((todo) => todo.json())
      .then(() => getTodoListFromServer());
    console.log("it's work");
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div>
        <Clock />
        Active Todo: {counterActiveTodo}
        <BntConsoleAndDelAllActiveTodo
            todoList={todoList}
            dltAllActiveTodo={deleteCompletedTodo}
        />
        <Input
            newTodoTitle={newTodoTitle}
            setNewTodoTitle={setNewTodoTitle}
            addNewTodo={addNewTodo}
        />
        <ButtonFilter
            allStatus={allStatus}
            activeStatus={activeStatus}
            completedStatus={completedStatus}
        />
        <RenderFilterTodoList
            todoList={todoList}
            changeCompleted={changeCompleted}
            deleteTodo={deleteTodo}
        />
    </div>
  );
};

export default IndexTodoList;
