import styles from "../styles/logout.module.css";
import LogoutIcon from "@mui/icons-material/Logout";

export function Logout() {
  return (
    <>
      <div className={styles.LogoutImg}>
        <LogoutIcon
          fontSize="medium"
          sx={{ color: "#ffffff", cursor: "pointer" }}
        />
      </div>
    </>
  );
}
