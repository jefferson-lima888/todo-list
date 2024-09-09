// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState } from "react";
import { TextField, Button, Paper } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../services/firebase";
import PropTypes from "prop-types";
import "./todoForm.scss";

export default function TodoForm({ onAdd, onDeleteAll }) {
  const [text, setText] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();

    if (text.trim() === "") {
      alert("Por favor, insira uma tarefa válida.");
      return;
    }

    try {
      const newTodo = {
        text: text,
        completed: false,
        time: new Date().toISOString(),
      };

      const docRef = await addDoc(collection(db, "todos"), newTodo);

      onAdd({
        key: docRef.id,
        ...newTodo,
      });
      setText("");
      alert("Tarefa adicionada com sucesso");
    } catch (error) {
      alert("Erro ao adicionar a tarefa", error.message);
    }
  };

  return (
    <Paper elevation={3} className="add-todo">
      <TextField
        label="Digite sua tarefa"
        value={text}
        variant="outlined"
        className="text-field"
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        disabled={!text}
        onClick={handleAdd}
      >
        <AddCircleOutlineOutlinedIcon />
        Adicionar
      </Button>
      <Button variant="contained" color="error" onClick={onDeleteAll}>
        <DeleteOutlinedIcon />
        Deletar todos
      </Button>
    </Paper>
  );
}

TodoForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onDeleteAll: PropTypes.func.isRequired,
};
