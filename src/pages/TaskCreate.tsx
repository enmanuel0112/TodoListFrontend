import { createTask } from "../services/tasks.service";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useState, useContext } from "react";
import contextComponent from "../context/AuthContext";
import { Header } from "../components/layout/Header";
import { useNavigate } from "react-router-dom";
type FormValues = {
  content: string;
  message: string;
  error?: void;
};
interface IUpdateTask {
  message: string;
}
type ErrorType = {
  errors: [];
  issues: { message: string }[][];
};

export const TaskCreate = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const [errorInput, setErrorInput] = useState<string | null>("");
  const [messageSucess, setMessageSucess] = useState("");
  const { user } = useContext(contextComponent);
  const navegate = useNavigate();

  const viewTaskNavegate = () => {
    navegate("/dashboard");
  };

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    try {
      const task = (await createTask(data.content)) as IUpdateTask;
      setMessageSucess(task.message);
      reset();
      if (task) {
        setTimeout(() => {
          setMessageSucess("");
        }, 3000);
      }
    } catch (error) {
      let apiError = "";
      if (error) apiError = (error as ErrorType).issues[0][0].message;
      setErrorInput(apiError);
    }
  };

  return (
    <>
      <Header />

      <div className="flex justify-center px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full max-w-4xl"
        >
          <div className="flex flex-col w-full items-center gap-8 md:gap-10 p-6 sm:p-8 lg:p-10 border-2 border-bgApp rounded-2xl shadow-sm">
            <div className="flex flex-col  md:flex-col md:items-center md:justify-between w-full gap-6 md:gap-8">
              <h1 className="w-full md:w-auto text-center md:text-left    sm:text-3xl lg:text-2xl">
                Hi
                <span className="text-green ml-3  sm:ml-5">
                  "{user?.userName}"
                </span>{" "}
              </h1>
              <label className="flex flex-col gap-2 w-full">
                <input
                  type="text"
                  className="input w-full min-w-0"
                  {...register("content", {
                    required: true,
                  })}
                />
                {errors.content ? (
                  <span className="text-red-500 gap-0">
                    This field is required
                  </span>
                ) : (
                  <span className="text-red-500 gap-0  ">{errorInput} </span>
                )}
              </label>
            </div>

            <div className="flex flex-col sm:flex-row w-full gap-3 sm:gap-4 sm:justify-center">
              <button className="btn w-full sm:w-auto">Create task</button>
              <button
                type="button"
                className="btn w-full sm:w-auto"
                onClick={() => {
                  viewTaskNavegate();
                }}
              >
                View Task
              </button>
            </div>
          </div>
        </form>
      </div>

      {messageSucess && (
        <div
          className="fixed top-4 right-4
         bg-green text-white px-4 py-2 rounded-md shadow-md
         
         "
        >
          {messageSucess}
        </div>
      )}
    </>
  );
};
