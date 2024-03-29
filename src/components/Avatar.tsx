import { Avatar as MuiAvatar, SxProps, Theme, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

interface UserInfo {
  username: string;
  firstName: string;
  lastName: string;
  firstInitial: string;
  lastInitial: string;
}

interface AvatarProps {
  firstName: string;
  lastName: string;
}

export function Avatar({ firstName, lastName }: AvatarProps) {
  const navigate = useNavigate();

  const openUsermanagement = () => {
    navigate("/account");
  };

  const user = validateUserInfo(firstName, lastName);

  const sxPropsContent: SxProps<Theme> = {
    fontSize: 12,
    height: 27,
    width: 27,
    bgcolor: stringToColor(user.username),
  };

  return (
    <Box>
      <Tooltip title="Account">
        <MuiAvatar onClick={openUsermanagement} sx={sxPropsContent}>
          {user.firstInitial.toUpperCase()}
          {user.lastInitial.toUpperCase()}
        </MuiAvatar>
      </Tooltip>
    </Box>
  );
}

function validateUserInfo(firstName: string, lastName: string): UserInfo {
  let username = firstName + " " + lastName;
  let firstInitial = firstName[0]?.toUpperCase() ?? "";
  let lastInitial = lastName[0]?.toUpperCase() ?? "";

  return { username, firstInitial, lastInitial, firstName, lastName };
}

function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}
