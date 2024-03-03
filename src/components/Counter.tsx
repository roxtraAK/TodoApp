import NotificationsIcon from "@mui/icons-material/Notifications";
import { Box, Tooltip } from "@mui/material";
import Badge from "@mui/material/Badge";

interface Counter {
  todos: number;
}

export default function Counter(props: Counter) {
  return (
    <>
      <Box>
        <Badge
          badgeContent={props.todos}
          color="primary"
          sx={{ marginRight: 1 }}
        >
          <Tooltip title="Todos">
            <NotificationsIcon fontSize="medium" sx={{ color: "#ffffff" }} />
          </Tooltip>
        </Badge>
      </Box>
    </>
  );
}
