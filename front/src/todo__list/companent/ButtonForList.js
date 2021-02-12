import React from "react";

const ButtonForList = (props) => {
  return (
    <div className="todo__list">
      <button
        onClick={() => (props.changeCompleted (props.it.id))}
      >
        {props.it.completed ? "notDone" : "Done"}
      </button>
      <button onClick={() => props.deleteTodo(props.it.id)}>DEL</button>
    </div>
  );
};

export default ButtonForList;
