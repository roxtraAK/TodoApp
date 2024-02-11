import { useState } from "react";
import { List } from "./components/List";
import { Login } from "./components/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import { RegisterPage } from "./components/RegisterPage";

export default function App() {
  const [todos, setTodo] = useState<string[]>([]);

  const addTodo = (text: string) => {
    if (text == "") {
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

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/todos",
      element: (
        <List addTodo={addTodo} deleteTodo={deleteLastTodo} todos={todos} />
      ),
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>
  );
}
