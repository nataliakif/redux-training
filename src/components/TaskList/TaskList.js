import { Task } from "components/Task/Task";
import css from "./TaskList.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchTasks } from "../../redux/taskSlice";
export const TaskList = () => {
  const tasks = useSelector(state => state.tasks.tasks);
  const dispatch = useDispatch();
  const taskCount = useSelector(state => state.tasks.tasks.length);

  useEffect(() => {
    if (taskCount === 0) {
      dispatch(fetchTasks());
    }
  }, [dispatch, taskCount]);

  return (
    <ul className={css.list}>
      {tasks.map(task => (
        <li className={css.listItem} key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
};
