import { Box, Tooltip } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

export function Logout() {
  return (
    <>
      <Box>
        <Tooltip title="Logout">
          <LogoutIcon
            fontSize="medium"
            sx={{ color: "#ffffff", cursor: "pointer" }}
          />
        </Tooltip>
      </Box>
    </>
  );
}
