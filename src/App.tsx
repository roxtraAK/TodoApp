import { useEffect, useState } from "react";
import { Todo } from "./components/Todo";
import { Login } from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RegisterPage } from "./components/RegisterPage";
import { Usermanagement } from "./components/Usermanagement";
import axios from "axios";
import { getUserData } from "./API/Api";

interface User {
  user_id: string;
  todos: string[];
}

export default function App() {
  const [todos, setTodos] = useState<string[]>([]);
  const [userData, setUserData] = useState<{
    user_id: number;
    username: string;
    firstname: string;
    lastname: string;
  }>({ user_id: 0, username: "", firstname: "", lastname: "" });

  const addTodo = (text: string) => {
    const _userData = localStorage.getItem("user");

    if (_userData) {
      setUserData(JSON.parse(_userData));
    }

    if (text === "") {
      alert("Geben Sie einen Text ein");
    } else {
      if (_userData && userData) {
        axios
          .post(`http://localhost:3000/users/${userData.user_id}/todos`, {
            text: text,
          })
          .then((response) => {
            console.log("New todo added successfully:", response.data);
            setTodos((prevTodos) => [...prevTodos, text]);
          })
          .catch((error) => {
            console.error("Error adding new todo:", error.message);
            alert("Error adding new todo");
          });
      } else {
        alert("todo could not be added successfully");
      }
    }
  };

  const deleteLastTodo = () => {
    const user: User | null = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    if (user && user.user_id) {
      const lastTodoId = todos[todos.length - 1];
      axios
        .delete(
          `http://localhost:3000/users/${user.user_id}/todos/${lastTodoId}`
        )
        .then(() => {
          console.log("Last todo deleted successfully");
          setTodos((prevTodos) => prevTodos.slice(0, -1));
        })
        .catch((error) => {
          console.error("Error deleting last todo:", error.message);
          alert("Error deleting last todo");
        });
    } else {
      alert("Benutzerdaten nicht gefunden");
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/todos"
          element={
            <Todo addTodo={addTodo} deleteTodo={deleteLastTodo} todos={todos} />
          }
        />
        <Route path="/account" element={<Usermanagement />} />
      </Routes>
    </Router>
  );
}
