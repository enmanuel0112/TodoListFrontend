import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import contextComponent from "../context/AuthContext";
import { updateTask } from "../services/tasks.service";

interface ITask {
  taskId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  isCompleted: boolean;
}
interface IFormInput {
  content: string;
}
interface IError {
  issues: { message: string }[][];
}

export const TaskEdit = ({ task }: { task: ITask }) => {
  const { setOpenModal } = useContext(contextComponent) ;
  const [ErrorResult, setErrorResult] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit = async (data: IFormInput) => {
    try {
      const updateTaskResult = await updateTask(task?.taskId, data.content);

      setOpenModal(false);

      if (!updateTaskResult) {
        throw new Error("DID NOT UPDATE TASK");
      }
      return updateTaskResult;
    } catch (error) {
      const apiError = (error as IError).issues?.[0]?.[0]?.message;
      setErrorResult(apiError);
    }
  };

  return (
    <>
      <div className="bg-bgApp p-8 rounded-[12px] shadow-lg flex flex-col gap-6 w-[800px]">
        <div className="flex justify-between items-centerpb-4">
          <h2 className="text-mainText text-2xl font-medium">Edit Task</h2>
          <button
            className="text-red-500 text-2xl cursor-pointer"
            onClick={() => setOpenModal(false)}
          >
            X
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-secondaryText font-medium">Current Task</span>
          <div className="bg-white p-6 rounded-[12px] shadow-md mb-4">
            <p className="text-secondaryText">" {task?.content} "</p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 border-gray-300 rounded-lg"
        >
          <label className="flex flex-col gap-2">
            <span className="text-secondaryText font-medium">Task new</span>
            <input
              type="text"
              className="bg-white text-mainText focus:outline-none p-4 rounded-[12px] shadow-md"
              {...register("content", { required: true })}
            />
          </label>
          {errors.content ? (
            <span className="text-red-500">This field is required</span>
          ) : (
            <span className="text-red-500">{ErrorResult}</span>
          )}
          <button className="btn">SaveTask</button>
        </form>
      </div>
    </>
  );
};
