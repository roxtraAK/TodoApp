import { useState } from "react";
import { Todo } from "./components/Todo";
import { Login } from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import { RegisterPage } from "./components/RegisterPage";
import { Usermanagement } from "./components/Usermanagement";

export default function App() {
  const [todos, setTodo] = useState<string[]>([]);

  const addTodo = (text: string) => {
    if (text === "") {
      alert("Gebe einen Text ein");
    } else {
      setTodo((prevTodos) => [...prevTodos, text]);
    }
  };

  const deleteLastTodo = (index: number) => {
    setTodo((prevTodos) => {
      const updatedTodos = [...prevTodos];
      updatedTodos.splice(index, 1);
      return updatedTodos;
    });
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
