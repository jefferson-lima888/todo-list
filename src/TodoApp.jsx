import "./App.scss";
import Header from "./components/Header/Header";
import { useEffect, useState } from "react";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
// import db from "./services/firebase";
// import firebase from "firebase/compat/app";
import { db, collection, addDoc, onSnapshot } from "./services/firebase";
import {
  query,
  orderBy,
  updateDoc,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }

function TodoApp() {
  // const [value, setValue] = useState(0);
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  // const today = new Date();
  // const dateTime =
  //   today.getDate() +
  //   "-" +
  //   (today.getMonth() + 1) +
  //   "-" +
  //   today.getFullYear() +
  //   " " +
  //   today.getHours() +
  //   ":" +
  //   today.getMinutes();

  const Add = async (e) => {
    e.preventDefault();
    // setTodos([...todos, text]);
    // setText("");

    // db.collection("todos")
    //   .add({
    //     text: text,
    //     completed: false,
    //     // TIME: dateTime,
    //     // SERVERtIMESTAMP: firebase.firestore.FieldValue.serverTimestamp(),
    //   })
    //   .then(() => {
    //     setText("");
    //     alert("Todo added successfully");
    //   })
    //   .catch((error) => {
    //     alert("Error adding todo", error.message);
    //   });

    try {
      await addDoc(collection(db, "todos"), {
        text: text,
        completed: false,
        time: new Date().toISOString(),
      });
      setText("");
      alert("Todo added successfully");
    } catch (error) {
      alert("Error adding todo: ", error.message);
    }
  };

  const Update = async (key) => {
    const modifyTodo = prompt("Enter the new todo", todos[key]);
    // todos[i] = modifyTodo;
    // setTodos([...todos]);

    // if (modifyTodo) {
    //   todos[key] = modifyTodo;
    //   setTodos([...todos]);
    // } else {
    //   alert("You have not updated any todo");
    // }

    if (modifyTodo) {
      try {
        console.log("ID do documento:", key);
        await updateDoc(doc(db, "todos", key), {
          text: modifyTodo,
          // completed: false,
          // time: new Date().toISOString(),
        });
        // setText("");
        alert("Todo updated successfully");
      } catch (error) {
        alert("Error updating todo: ", error.message);
      }
    }
  };

  const Delete = async (key) => {
    // todos.splice(i, 1);
    // setTodos([...todos]);
    try {
      await deleteDoc(doc(db, "todos", key));
      alert("Todo deleted successfully");
    } catch (error) {
      alert("Error deleting todo: ", error.message);
    }
  };

  const DeleteAll = async () => {
    // setTodos([]);
    // if (DeleteAll) {
    //   alert("Are you sure you want to delete all todos?");
    //   setTodos([]);
    // } else {
    //   alert("You have not deleted any");
    // }

    try {
      console.log("Iniciando o processo de deleção de todos os documentos...");
      const todosCollection = collection(db, "todos");
      const todosSnapshot = await getDocs(todosCollection);

      console.log(`Documentos encontrados: ${todosSnapshot.size}`);

      if (todosSnapshot.size === 0) {
        alert("Nenhum documento encontrado para deletar.");
        return;
      }

      const deletePromises = todosSnapshot.docs.map((todo) => {
        console.log(`Deletando documento com ID: ${todo.id}`);
        return deleteDoc(doc(db, "todos", todo.id)); // Deleta cada documento
      });

      await Promise.all(deletePromises);
      console.log("Todos os documentos foram deletados.");
      alert("All todos deleted successfully");
    } catch (error) {
      console.error("Erro ao deletar todos os documentos:", error);
      alert("Error deleting all todos: ", error.message);
    }
  };

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  useEffect(() => {
    console.log(db);
    // db.collection("todos").onSnapshot((querySnapshot) => {
    //   setTodos(
    //     querySnapshot.docs.map((doc) => ({
    //       key: doc.id,
    //       todoF: doc.data().TODO,
    //       time: doc.data().TIME,
    //     }))
    //   );
    // });

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
      console.log(querySnapshot.docs.map((doc) => doc.data()));
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <div>
        <Header />
        {/* <main>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs">
              <Tab label="Todos" {...a11yProps(0)} />
              <Tab label="Para Fazer" {...a11yProps(1)} />
              <Tab label="Completos" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <div>
            <TextField
              id="outlined-required"
              // label="Required"
              defaultValue="Acicionar tarefa"
            />
            <Button variant="contained">Adicionar</Button>
          </div>
          <section>
            <div>
              <div>
              <TextField
              id="outlined-required"
              // label="Required"
              defaultValue="Acicionar tarefa"
            />
              </div>
            </div>
          </section>
        </main> */}
        <form>
          <Paper elevation={3} className="Add_Todo">
            <TextField
              className="Text_Field"
              label="Digite sua tarefa"
              value={text}
              variant="outlined"
              onChange={(e) => setText(e.target.value)}
            />
            <Button
              variant="contained"
              type="submit"
              color="primary"
              disabled={!text}
              onClick={Add}
            >
              <AddCircleOutlineOutlinedIcon />
              Adicionar
            </Button>
            <Button variant="contained" color="primary" onClick={DeleteAll}>
              <DeleteOutlinedIcon />
              Deletar todos
            </Button>
          </Paper>
        </form>
        {todos.map((data, i) => {
          return (
            <Paper elevation={3} className="Todos_Rendering" key={data.key}>
              <p>
                {i + 1}. {data.todoF}
              </p>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => Update(data.key, data.todoF)}
                >
                  <UpdateIcon />
                  Atualizar
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => Delete(data.key)}
                >
                  <DeleteOutlinedIcon />
                  Deletar
                </Button>
              </div>
              <span>{data.completed ? "Completed" : "Incomplete"}</span>
              {/* <span>{data.time}</span> */}
            </Paper>
          );
        })}
      </div>
    </>
  );
}

export default TodoApp;
