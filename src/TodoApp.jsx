import "./App.scss";
import Header from "./components/Header/Header";
import { useEffect, useState } from "react";
import { db, collection, addDoc, onSnapshot } from "./services/firebase";
import {
  query,
  orderBy,
  updateDoc,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import TodoForm from "./components/TodoForm/TodoForm";
import TodoList from "./components/TodoList/TodoList";

function TodoApp() {
  const [todos, setTodos] = useState([]);

  const Update = async (key) => {
    const modifyTodo = prompt("Inserir a nova tarefa", todos[key]);

    if (modifyTodo) {
      try {
        await updateDoc(doc(db, "todos", key), {
          text: modifyTodo,
        });
      } catch (error) {
        alert("Erro ao atualizar a tarefa", error.message);
      }
    }
  };

  const Delete = async (key) => {
    try {
      await deleteDoc(doc(db, "todos", key));
      alert("Tarefa apagada com sucesso");
    } catch (error) {
      alert("Erro ao remover tarefa ", error.message);
    }
  };

  const DeleteAll = async () => {
    try {
      const todosCollection = collection(db, "todos");
      const todosSnapshot = await getDocs(todosCollection);

      if (todosSnapshot.size === 0) {
        alert("Nenhum documento encontrado para deletar.");
        return;
      }

      const deletePromises = todosSnapshot.docs.map((todo) => {
        return deleteDoc(doc(db, "todos", todo.id));
      });

      await Promise.all(deletePromises);

      alert("Todos os documentos foram deletados com sucesso");
    } catch (error) {
      alert("Erro ao deletar todos os documentos", error.message);
    }
  };

  const handleAdd = (newTodo) => {
    setTodos((prevTodos) => {
      const isDuplicate = prevTodos.some((todo) => todo.key === newTodo.key);
      if (!isDuplicate) {
        return [newTodo, ...prevTodos];
      }
      return prevTodos;
    });
  };

  useEffect(() => {
    const todosCollection = collection(db, "todos");
    const orderTodos = query(todosCollection, orderBy("time", "desc"));
    const unsubscribe = onSnapshot(orderTodos, (querySnapshot) => {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          key: doc.id,
          todoF: doc.data().text,
          completed: doc.data().completed,
          time: doc.data().time,
        }))
      );
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <div>
        <Header />
        <TodoForm onAdd={handleAdd} onDeleteAll={DeleteAll} />
        <TodoList todos={todos} onUpdate={Update} onDelete={Delete} />
      </div>
    </>
  );
}

export default TodoApp;
