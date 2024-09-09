import React from "react";
import PropTypes from "prop-types";
import TodoItem from "../TodoItem/TodoItem";

function TodoList({ todos, onUpdate, onDelete }) {
  return (
    <>
      {todos.map((todo) => (
        <TodoItem
          key={todo.key}
          todo={todo}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </>
  );
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TodoList;
