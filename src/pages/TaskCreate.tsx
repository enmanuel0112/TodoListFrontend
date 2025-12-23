import { createTask } from "../services/tasks.service";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useState, useContext } from "react";
import contextComponent from "../context/AuthContext";
import { Header } from "../components/layout/Header";
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
  issues?: { message: string }[][];
};

export const TaskCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [errorInput, setErrorInput] = useState<string | null>("");
  const [messageSucess, setMessageSucess] = useState("");
  const { user } = useContext(contextComponent);

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    try {
      const task = (await createTask(data.content)) as IUpdateTask;
      setMessageSucess(task?.message);
      if (task) {
        setTimeout(() => {
          setMessageSucess("");
        }, 3000);
      }
    } catch (error) {
      let apiError = "";
      if (error)
        apiError =
          (error as ErrorType).issues?.[0]?.[0]?.message ||
          "ups, something went wrong";
      setErrorInput(apiError);
      console.log(apiError);

      console.log("tengo que verificar", error);
    }
  };

  return (
    <>
 <Header />

      <div>
        <h1 className="text-center text-4xl mt-6">
          Welcome to <span className="text-green">"{user?.userName}"</span>{" "}
        </h1>
      </div>

      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col h-full"
      >
        <div
          className="flex flex-col h-full
         items-center justify-center m-auto gap-[3rem]"
        >
          <label htmlFor="" className="flex flex-col gap-2">
            <input
              type="text"
              className="input w-[500px]"
              {...register("content", {
                required: true,
              })}
            />
            {errors.content ? (
              <span className="text-red-500 gap-0">This field is required</span>
            ) : (
              <span className="text-red-500 gap-0  ">{errorInput} </span>
            )}
          </label>

          <button className="btn">Create task</button>
        </div>
      </form>
      {<p className="text-green gap-0 m-auto  ">{messageSucess}</p>}
    </>
  );
};
