import React from "react";
import ButtonForList from "./ButtonForList";
import '../assets/styles.css'

const RenderFilterTodoList = (props) => {
  return (
    <div >
      {props.todoList.map((it) => {
        return (
          <div key={it.id}  >
            title: {it.title} id: {it.id}

            <ButtonForList
              it={it}
              changeCompleted={props.changeCompleted}
              deleteTodo={props.deleteTodo}
            />
            
          </div>
        );
      })}
    </div>
  );
};

export default RenderFilterTodoList;
