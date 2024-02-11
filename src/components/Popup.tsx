import styles from "../popup.module.css";

interface IPopupProps {
  message: string;
}

export default function Popup(props: IPopupProps) {
  return (
    <div className={styles.popup}>
      {props.message}
      <div className={styles.popupinner}>
        <button className={styles.buttonClose}>close</button>
      </div>
    </div>
  );
}
