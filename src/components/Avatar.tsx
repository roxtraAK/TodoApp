import { Avatar as MuiAvatar, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

export function Avatar() {
  const navigate = useNavigate();

  const openUsermanagement = () => {
    navigate("/account");
  };

  return (
    <>
      <Box>
        <Tooltip title="Account">
          <MuiAvatar
            onClick={() => openUsermanagement()}
            sx={{ width: 24, height: 24 }}
            alt="Remy Sharp"
            src=""
          />
        </Tooltip>
      </Box>
    </>
  );
}
