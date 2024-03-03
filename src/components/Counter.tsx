import NotificationsIcon from "@mui/icons-material/Notifications";
import styles from "../styles/todos.module.css";
import { Box } from "@mui/material";

interface Counter {
  todos: number;
}

export default function Counter(props: Counter) {
  return (
    <>
      <Box className={styles.CounterImg}>
        <NotificationsIcon
          fontSize="medium"
          sx={{ color: "#ffffff", marginRight: 0.5 }}
        />
      </Box>
      <Box className={styles.CounterNumber}>{props.todos}</Box>
    </>
  );
}
