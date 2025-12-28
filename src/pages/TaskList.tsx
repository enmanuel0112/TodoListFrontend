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
      <ul className="flex flex-col gap-6 sm:gap-8 w-full max-w-4xl mx-auto px-4 sm:px-0 list-none">
        {taskList.map((task: dataTask) => (
          <li
            key={task?.taskId}
            className="bg-green p-4 sm:p-5 rounded-[20px] w-full flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
          >
            <div className="flex flex-1 items-start gap-3 sm:gap-4 min-w-0">
              <input
                type="checkbox"
                checked={task?.isCompleted}
                onChange={(e) => handleInput(task, e.target.checked)}
                className="h-6 w-6 sm:h-7 sm:w-7 cursor-pointer mt-1 sm:mt-0 shrink-0"
              />

              <p
                className={
                  task?.isCompleted
                    ? "flex-1 line-through text-gray-200 uppercase break-words p-2 sm:p-3"
                    : "flex-1 text-start uppercase break-words p-2 sm:p-3 text-white"
                }
              >
                {task?.content}
              </p>
            </div>

            <div className="flex w-full sm:w-auto gap-2 sm:gap-3 justify-end sm:justify-center">
              <ButtonDelete task={task} />
              <ButtonUpdate task={task} />
            </div>
          </li>
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
