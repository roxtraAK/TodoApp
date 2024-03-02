import Bell from "../img/bell.png";
import styles from "../styles/index.module.css";

interface Counter {
  todos: number;
}

export default function Counter(props: Counter) {
  return (
    <>
      <div className={styles.CounterImg}>
        <img src={Bell} style={{ height: 40 }}></img>
      </div>
      <div className={styles.CounterNumber}>{props.todos}</div>
    </>
  );
}
