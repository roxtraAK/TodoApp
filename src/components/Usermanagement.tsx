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
          height: "40vh",
          marginTop: 10,
          width: "300px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          marginBottom: "100px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "80vh",
            alignItems: "center",
            marginRight: 8,
            marginTop: -15,
          }}
        >
          <TextField id="standard-basic" label="Firstname" variant="standard" />
          <TextField id="standard-basic" label="Lastname" variant="standard" />
          <FormControlLabel
            sx={{ marginTop: 3, marginRight: 8 }}
            control={<Switch defaultChecked />}
            label="Dark Mode"
          />
          <Box
            sx={{
              marginLeft: 7,
            }}
          >
            <Button sx={{ marginTop: 8, marginRight: 2 }} variant="contained">
              Upload
            </Button>
            <Button sx={{ marginTop: 8 }} variant="contained">
              Apply changes
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
