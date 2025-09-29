import { useContext, useState } from "react";
import contextComponent from "../context/AuthContext";
import { ButtonDelete, ButtonUpdate } from "../components/Button";
import { TaskEdit } from "./TaskEdit";
import { checkTask } from "../services/tasks.service";
interface ITask {
  taskId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  isCompleted: boolean;
}

export const TaskList = () => {
  const { task, openModal, taskList } = useContext(contextComponent);
  const [completed, setCompleted] = useState<boolean>(task?.isCompleted || false);

  const handleInput = async (task: ITask) => {
    const next = !task?.isCompleted;
    setCompleted(next);
    await checkTask(task?.taskId, completed);
  };

  return (
    <>
      <ul className="flex flex-col  gap-9 m-auto w-[100%] ">
        {taskList.map((task: ITask) => (
          <div
            key={task?.taskId}
            className="bg-green p-4 rounded-[20px] w-auto flex justify-between content-center"
          >
            <div className="flex gap-6 min-w-0 ">
              <input
                type="checkbox"
                onChange={() => handleInput(task)}
                className="w-[30px] cursor-pointer"
              ></input>

              <li className="text-start uppercase w-[80%] break-words p-4 text-white">
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
          ${
            openModal
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          } 
          `}
        >
          <TaskEdit task={task} />
        </div>
      )}
    </>
  );
};
