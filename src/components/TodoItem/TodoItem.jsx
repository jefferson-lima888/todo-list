// eslint-disable-next-line no-unused-vars
import React from "react";
import { Button, Paper } from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import "./todoItem.scss";

import PropTypes from "prop-types";

function TodoItem({ todo, onUpdate, onDelete }) {
  return (
    <Paper elevation={3} className="todos-rendering">
      <p>{todo.todoF}</p>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onUpdate(todo.key, todo.todoF)}
        >
          <UpdateIcon />
          Atualizar
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onDelete(todo.key)}
        >
          <DeleteOutlinedIcon />
          Deletar
        </Button>
      </div>
      <span>{todo.completed ? "Completed" : "Incomplete"}</span>
    </Paper>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    todoF: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TodoItem;
