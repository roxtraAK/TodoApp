import PersonIcon from "@mui/icons-material/Person";
import { Tooltip } from "@mui/material";
import Box from "@mui/material/Box";

export function AccountManagement() {
  return (
    <>
      <Box>
        <Tooltip title="Account">
          <PersonIcon
            fontSize="medium"
            sx={{ color: "#ffffff", cursor: "pointer" }}
          />
        </Tooltip>
      </Box>
    </>
  );
}
