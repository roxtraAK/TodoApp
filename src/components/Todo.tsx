import { useState } from "react";
import styles from "../styles/todos.module.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Counter from "./Counter";
import { Logout } from "./Logout";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AccountManagement } from "./Account";

export function Todo({ addTodo, todos, deleteTodo, editTodo }: any) {
  const [input, setInput] = useState<string>("");
  const navigate = useNavigate();

  const handleOnChange = (e: any) => {
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
              <AccountManagement />
            </Box>
            <Box onClick={() => handleLogout()}>
              <Logout />
            </Box>
          </Box>
          <input
            className={styles.textbox}
            value={input}
            onChange={handleOnChange}
            type="text"
          ></input>
          <button onClick={() => addTodo(input)} className={styles.todoButton}>
            Add Todo
          </button>
          {todos.map((todo: string, index: number) => (
            <>
              <Box className={styles.TodoContent}>
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
            </>
          ))}
        </Box>
      </Box>
    </>
  );
}
