import { useState } from "react";
import styles from "../index.module.css";
import { FaEdit } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import Counter from "./Counter";

export function List({ addTodo, todos, deleteTodo, editTodo }: any) {
  const [input, setInput] = useState<string>("");

  const handleOnChange = (e: any) => {
    setInput(e.target.value);
  };

  return (
    <>
      <div className={styles.MainContent}>
        <div className={styles.TodoList}>
          <div className={styles.Header}>
            <div className={styles.MiddleContent}>
              <h1>Reminders</h1>
            </div>
            <Counter todos={todos.length} />
          </div>
          <input
            className={styles.textbox}
            value={input}
            onChange={handleOnChange}
            type="text"
          ></input>
          <button onClick={() => addTodo(input)} className={styles.todoButton}>
            Add Todo
          </button>
          {todos.map((todo: string, index: number) => (
            <>
              <div className={styles.TodoContent}>
                {todo}
                <div className={styles.icons}>
                  <div onClick={() => deleteTodo(index)}>
                    <TiDeleteOutline size={30} />
                  </div>
                  <div onClick={() => editTodo(index)}>
                    <FaEdit size={30} />
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
