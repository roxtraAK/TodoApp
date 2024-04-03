import styles from "../styles/todos.module.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Counter from "./Counter";
import { Logout } from "./Logout";
import { Box } from "@mui/material";
import { Avatar } from "./Avatar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function Todo({ addTodo, todos, deleteTodo, editTodo }: any) {
  const [input, setInput] = useState<string>("");
  const [userData, setUserData] = useState<{
    user_id: number;
    username: string;
    firstname: string;
    lastname: string;
  }>({ user_id: 0, username: "", firstname: "", lastname: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const _userData = localStorage.getItem("user");

    if (_userData) {
      setUserData(JSON.parse(_userData));
    }
  }, []);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
      <Box className={styles.MainContent}>
        <Box className={styles.TodoList}>
          <Box className={styles.Header}>
            <Box className={styles.MiddleContent}>
              <h1>Reminders</h1>
            </Box>
            <Counter todos={todos.length} />
            <Box sx={{ marginRight: 1 }}>
              <Avatar
                firstName={userData.firstname}
                lastName={userData.lastname}
              />
            </Box>
            <Box onClick={handleLogout}>
              <Logout />
            </Box>
          </Box>
          <input
            className={styles.textbox}
            value={input}
            onChange={handleOnChange}
            type="text"
          />
          <button onClick={() => addTodo(input)} className={styles.todoButton}>
            Add Todo
          </button>
          {todos.map((todo: string, index: number) => (
            <Box key={index} className={styles.TodoContent}>
              {todo}
              <Box className={styles.icons}>
                <Box onClick={() => deleteTodo(index)}>
                  <DeleteIcon
                    sx={{ display: "flex", marginTop: 0.5, marginRight: 0.5 }}
                  />
                </Box>
                <Box onClick={() => editTodo(index)}>
                  <EditIcon sx={{ display: "flex", marginTop: 0.5 }} />
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}
