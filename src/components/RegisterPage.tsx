import { Alert, Box, Button, SxProps, TextField, Theme } from "@mui/material";
import axios from "axios";
import styles from "../styles/register.module.css";
import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate } from "react-router-dom";

const sxPropsContent: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  minHeight: "100vh",
  marginLeft: 40,
  marginRight: 40,
  borderRadius: 2,
};

export function RegisterPage() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleFirstnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstname(e.target.value);
  };

  const handleLastnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastname(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePhonenumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhonenumber(e.target.value);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const onRegister = () => {
    if (!password || !confirmPassword) {
      console.error("Password and Confirm Password cannot be empty");
      <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
        Password and Confirm Password cannot be empty
      </Alert>;
      return;
    }

    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    axios
      .post("http://localhost:3000/users", {
        firstname: firstname,
        lastname: lastname,
        email: email,
        phonenumber: phonenumber,
        username: username,
        password: password,
      })
      .then((response) => {
        console.log("New user added successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error adding new user:", error.response.data);
      });

    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
      Registration was successful.
    </Alert>;

    setTimeout(function () {
      navigate("/");
    }, 2000);
  };

  return (
    <Box sx={sxPropsContent}>
      <h1
        style={{
          paddingBottom: 40,
          fontSize: 30,
          color: "#1565C0",
        }}
      >
        Sign Up
      </h1>
      <video
        className={styles.video}
        muted
        playsInline
        style={{ width: "100%", height: "100%" }}
      >
        <source src="/todo.mp4" type="video/mp4"></source>
      </video>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          label="Firstname"
          value={firstname}
          onChange={handleFirstnameChange}
          variant="standard"
        />
        <TextField
          label="Lastname"
          value={lastname}
          onChange={handleLastnameChange}
          variant="standard"
        />
        <TextField
          label="E-Mail"
          value={email}
          onChange={handleEmailChange}
          variant="standard"
        />
        <TextField
          label="Mobile number"
          value={phonenumber}
          onChange={handlePhonenumberChange}
          variant="standard"
        />
        <TextField
          sx={{ marginTop: 4 }}
          value={username}
          label="Username"
          variant="standard"
          onChange={handleUsernameChange}
        />
        <TextField
          label="Password"
          onChange={handlePasswordChange}
          value={password}
          variant="standard"
          type="password"
        />
        <TextField
          label="Confirm Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          variant="standard"
          type="password"
        />
      </Box>
      <Box sx={{ marginTop: 5 }}>
        <Button
          variant="contained"
          onClick={() => onRegister()}
          color="primary"
          sx={{ width: 190, height: 60, fontSize: 17, fontWeight: 600 }}
        >
          Sumbit
        </Button>
      </Box>
    </Box>
  );
}
