import { useContext } from "react";
import contextComponent from "../context/AuthContext";
import { ButtonDelete, ButtonUpdate } from "../components/Button";
import { TaskEdit } from "./TaskEdit";
import { checkTask } from "../services/tasks.service";

interface dataTask {
  taskId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  isCompleted: boolean;
}

export const TaskList = () => {
  const { task, openModal, taskList, setTaskList } = useContext(contextComponent);

  const handleInput = async (task: dataTask, isChecked: boolean) => {
    await checkTask(task?.taskId, isChecked)
     setTaskList((prev) =>
    prev.map((t) => (t.taskId === task.taskId ? { ...t, isCompleted: isChecked } : t))
  );
  };

  return (
    <>
      <ul className="flex flex-col  gap-9 m-auto w-[100%] ">
        {taskList.map((task: dataTask) => (
          <div
            key={task?.taskId}
            className="bg-green p-4 rounded-[20px] w-auto flex justify-between content-center"
          >
            <div className="flex gap-6 min-w-0 ">
              <input
                type="checkbox"
                checked={task?.isCompleted}
                onChange={(e) => handleInput(task, e.target.checked)}
                className="w-[30px] cursor-pointer"
              ></input>

              <li className={task?.isCompleted ? "line-through text-gray-500 uppercase  w-[80%] break-words p-4" : "text-start uppercase w-[80%] break-words p-4 text-white"}>
                {task?.content}
              </li>
            </div>

            <div className="flex gap-2 shrink-0">
              <ButtonDelete task={task} />
              <ButtonUpdate task={task} />
            </div>
          </div>
        ))}
      </ul>

      {openModal && (
        <div
          className={`fixed top-0 left-0 w-full h-full
          bg-green/50 flex justify-center items-center 
          transition-all duration-300 ease-in-out
          `}
        >
          <TaskEdit task={task as dataTask} />
        </div>
      )}
    </>
  );
};
