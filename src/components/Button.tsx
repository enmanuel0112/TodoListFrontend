import { useContext } from "react";
import { deleteTask } from "../services/tasks.service";
import contextComponent from "../context/AuthContext";

type buttonProps = {
  name: string;
  onclick?: () => void;
};

type buttonPropsForm = {
  name: string;
  type?: "button" | "submit" | "reset" | undefined;
};
interface ITask {
  taskId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  isCompleted: boolean;
}


export const Button = ({ name, onclick }: buttonProps) => {
  return (
    <>
      <button onClick={onclick} className="btn">
        {name}
      </button>
    </>
  );
};

export const ButtonForm = ({ name, type }: buttonPropsForm) => {
  return (
    <>
      <button
        type={type}
        className="w-[300px] bg-white text-[#333333] 
            font-semibold cursor-pointer text-2xl py-3 px-6 
            rounded-[12px] shadow-lg hover:text-[#6B936D] hover:scale-105 hover:shadow-xl 
            transition-all duration-300 ease-in-out"
      >
        {name}
      </button>
    </>
  );
};
export const ButtonDelete = ({ task }: { task: ITask }) => {
   const { taskDelete, setTaskDelete } = useContext(
    contextComponent)
  const handleDelete = async (task: ITask) => {
    const deleted = await deleteTask(task?.taskId);
    setTaskDelete(!taskDelete);
    return deleted;
  };

  return (
    <>
      <button
        className="bg-white cursor-pointer rounded-3xl w-[70px] h-auto 
            m-auto hover:text-green transition-all duration-300 ease-in-out p-2 "
        onClick={() => handleDelete(task)}
      >
        Delete
      </button>
    </>
  );
};

export const ButtonUpdate = ({ task }: { task: ITask }) => {
  const { setOpenModal, setTask } = useContext(
    contextComponent
  ) ;

  return (
    <>
      <button
        className="bg-white cursor-pointer rounded-3xl w-[70px] h-auto
        m-auto hover:text-green transition-all duration-300 ease-in-out p-2 "
        onClick={() => {
          setTask(task);
          setOpenModal(true);
          
        }}
      >
        Edit
      </button>
    </>
  );
};
