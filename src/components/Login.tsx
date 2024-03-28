import React, { useRef, useState } from "react";
import styles from "../styles/login.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    axios
      .get("http://localhost:3000/auth", {
        params: {
          username,
          password,
        },
      })
      .then((response) => {
        if (
          username == response.data.username &&
          password == response.data.password
        ) {
        }
        console.log("logged in successfully:", response.data);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        navigate("/todos");
      })
      .catch((error) => {
        console.error("user not found:", error.response.data);
        alert("User not found");
        return;
      });
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const NavigateToRegisterPage = () => {
    const path = "/register";
    navigate(path);
  };

  const showPassword = () => {
    if (passwordInputRef && passwordInputRef.current?.type == "password") {
      passwordInputRef.current.type = "text";
    } else if (passwordInputRef.current?.type == "text") {
      passwordInputRef.current.type = "password";
    }
  };

  return (
    <Box className={styles.Content}>
      <video
        className={styles.video}
        muted
        playsInline
        style={{ width: "100%", height: "100%" }}
      >
        <source src="/todo.mp4" type="video/mp4"></source>
      </video>
      <Box className={styles.header}>
        <h1 style={{ fontSize: 40, color: "#1565C0" }} title="Login">
          Login
        </h1>
      </Box>
      <Box className={styles.loginContent}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            sx={{ marginRight: 2 }}
            id="username-input"
            label="Username"
            variant="standard"
            value={username}
            onChange={handleUsernameChange}
          ></TextField>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            sx={{ marginRight: 2, marginLeft: 3 }}
            id="password-input"
            label="Password"
            inputRef={passwordInputRef}
            value={password}
            onChange={handlePasswordChange}
            type="password"
            variant="standard"
            onKeyPress={handleKeyPress}
          ></TextField>
          <VisibilityIcon color="action" onClick={() => showPassword()} />
        </Box>
        <Box sx={{ display: "flex", gap: 1, paddingRight: 2 }}>
          <Button onClick={handleLogin} color="primary" variant="contained">
            Login
          </Button>
          <Button
            color="primary"
            onClick={() => NavigateToRegisterPage()}
            variant="contained"
          >
            Registrieren
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
