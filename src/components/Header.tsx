import styles from "../index.module.css";

interface HeaderProps {
  title: string;
  counter: number;
}

export default function Header(props: HeaderProps) {
  return (
    <div className={styles.header}>
      <h1 className={styles.headerText}>{props.title}</h1>
    </div>
  );
}
