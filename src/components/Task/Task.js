import { MdClose } from "react-icons/md";
import css from "./Task.module.css";
import { toggleTask, deleteTask } from "../../redux/taskSlice";
import { useDispatch } from "react-redux";

export const Task = ({ task }) => {
  const dispatch = useDispatch();
  return (
    <div className={css.wrapper}>
      <input
        type="checkbox"
        className={css.checkbox}
        checked={task.completed}
        onChange={() => dispatch(toggleTask(task.id))}
      />
      <p className={css.text}>{task.title}</p>
      <button onClick={() => dispatch(deleteTask(task.id))} className={css.btn}>
        <MdClose size={24} />
      </button>
    </div>
  );
};
