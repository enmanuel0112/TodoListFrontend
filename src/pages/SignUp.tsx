//  import { useState } from "react";
import { Header } from "../components/layout/Header";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { signUp } from "../services/auth.service";
import { useContext, useState } from "react";
import contextComponent from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const authContext = useContext(contextComponent);
  const navegate = useNavigate();
  const user = authContext?.user;
  const handleClick = () => {
    if (user) {
      navegate("/dashboard");
    }
  };
  type ErrorRegister = {
    message: string;
  };

  type FormValues = {
    username: string;
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setErrorMessage(null);
      setSuccessMessage(null);
      const result = await signUp(data.username, data.email, data.password);
      handleClick();
      const message =
        (result as { message?: string })?.message || "Register success";
      setSuccessMessage(message);
      reset();
    } catch (error: unknown) {
      const errObj = error as {
        message?: string;
        errors?: string;
        issues?: ErrorRegister[];
      };
      const firstIssue = errObj?.issues?.[0]?.message;
      const message =
        firstIssue ||
        errObj?.errors ||
        errObj?.message ||
        "Ups, something went wrong";
      setErrorMessage(message);
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen justify-center items-center px-4 py-12 sm:px-6 lg:px-8">
        <div
          className="flex flex-col w-full max-w-md sm:max-w-lg gap-8 items-center justify-center bg-cardTask p-6 sm:p-8 lg:p-10 rounded-[12px] border-green border shadow-lg shadow-lightShadow"
        >
          <h1 className="text-4xl font-semibold">
            Sing
            <span className="text-green">up</span>
          </h1>
          <p className="text-2xl text-right text-green">
            All
            <span className="text-black"> starts here</span>
          </p>

          {errorMessage && (
            <span className="text-red-500 text-center">{errorMessage}</span>
          )}
          {successMessage && (
            <span className="text-green text-center font-semibold">
              {successMessage}
            </span>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 sm:gap-8 items-center w-full"
          >
            <div className="w-full">
              <label htmlFor="" className="flex items-center gap-2 input w-full">
                <input
                  type="text"
                  placeholder="Name"
                  className="bg-transparent w-full focus:outline-none text-secondaryText"
                  {...register("username", {
                    required: true,
                  })}
                />
                <FaUser className=" text-2xl text-green" />
              </label>
              {errors.username && (
                <span className="text-red-500 gap-0">
                  This field is required
                </span>
              )}
            </div>

            <div className="w-full">
              <label htmlFor="" className="flex items-center gap-2 input w-full">
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-transparent w-full focus:outline-none text-secondaryText"
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

            <div className="w-full">
              <label htmlFor="" className=" flex items-center gap-0 input w-full">
                <input
                  type="password"
                  placeholder="Password"
                  className="bg-transparent w-full focus:outline-none text-secondaryText"
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

            <button className="btn w-full" name="Sign In">
              sign up
            </button>
          </form>
        </div>
        {/* {errorHook && (
          <span className="text-red-500 gap-0 transition-all">{errorHook}</span>
        )} */}
      </div>
    </>
  );
};
