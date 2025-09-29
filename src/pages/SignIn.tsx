import { useState } from "react";
import { signIn } from "../services/auth.service";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { Header } from "../components/layout/Header";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Spinner } from "../components/Spinner";
import {useNavigate } from "react-router-dom";
export const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [errorHook, setErrorHook] = useState<string | null>("");
  const navigate = useNavigate();
  type FormValues = {
    error?: void;
    email: string;
    password: string;
  };
  const {
    register,
    handleSubmit,
    // setError,
    formState: { errors }
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    
    try {
      setLoading(true);
      const authUser = await signIn(data.email, data.password);
      if(authUser?.userInfo) {
        navigate('/dashboard')
      }
    } catch (error) {
      let apiError = "";
      if (error)
        apiError =
          (error as { errors: string }).errors || "ups, something went wrong";
      setErrorHook(apiError);
    } finally {
      setLoading(false);
    }
  };



  return (
    <>
      <Header />
  
      {loading && <Spinner />}

      <div
        className="flex flex-col h-[90vh] justify-center
       items-center mx-auto"
      >
        <div
          className="flex flex-col gap-8 
        items-center justify-center mx-auto
         bg-cardTask p-10 w-[500px] h-auto rounded-[12px]
         border-green border shadow-lg shadow-lightShadow
         "
        >
          <h1 className="text-4xl font-semibold">
            Lo
            <span className="text-green">gin</span>
          </h1>
          <p className="text-2xl text-green">
            Nice to see
            <span className="text-black"> you again</span>
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8 items-center "
          >
            <div>
              <label htmlFor="" className="flex items-center gap-2 input">
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-transparent w-[250px] focus:outline-none text-secondaryText"
                  {...register("email", {
                    required: true,
                  })}
                />
                <MdEmail className=" text-2xl text-green" />
              </label>
              {errors.email && (
                <span className="text-red-500 gap-0">
                  This field is required
                </span>
              )}
            </div>

            <div>
              <label htmlFor="" className=" flex items-center gap-2 input">
                <input
                  type="password"
                  placeholder="Password"
                  className="bg-transparent w-[250px] focus:outline-none text-secondaryText"
                  {...register("password", {
                    required: true,
                  })}
                />
                <RiLockPasswordFill className=" text-2xl text-green" />
              </label>
              {errors.password && (
                <span className="text-red-500 gap-0">
                  This field is required
                </span>
              )}
            </div>

            <button className="btn" name="Sign In">
              sign in
            </button>
          </form>
        </div>
        {errorHook && (
          <span className="text-red-500 gap-0 transition-all">{errorHook}</span>
        )}
      </div>
    </>
  );
};
