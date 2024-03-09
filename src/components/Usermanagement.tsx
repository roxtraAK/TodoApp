import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";

export function Usermanagement() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
      }}
    >
      <h1
        style={{
          fontSize: 30,
          color: "#1565C0",
        }}
      >
        Account
      </h1>

      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: 8,
          padding: 20,
          marginTop: 20,
          width: "300px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexWrap: "nowrap",
          }}
        >
          <TextField id="standard-basic" label="Vorname" variant="standard" />
          <TextField id="standard-basic" label="nachname" variant="standard" />
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Dark Mode"
          />
          <Button variant="contained">Upload</Button>
        </Box>
      </Box>
    </Box>
  );
}
