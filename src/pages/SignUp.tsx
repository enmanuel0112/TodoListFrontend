//  import { useState } from "react";
import { Header } from "../components/layout/Header";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { signUp } from "../services/auth.service";
import { useContext } from "react";
import contextComponent from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  //  const [errorHook, setErrorHook] = useState<string | null>("");
  // const [erroVerificar, setErrorVerificar] = useState<ErrorRegister>([])
  const authContext = useContext(contextComponent);
  const navegate = useNavigate();
  const user = authContext?.user;
  console.log(user);
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
    //  setError,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const result = await signUp(data.username, data.email, data.password);

      console.log("que es esto?", result);
      handleClick();
    } catch (error: unknown) {
      const registerError =
        (error as { issues: ErrorRegister[] }).issues ||
        "ups, something went wrong";

      // const errors = Array.isArray(registerError) ? registerError : [registerError];
      const errors = registerError;
      console.log("que me retornas", errors);

      const resultado = errors.map((issue) => {
        return issue;
      });
      console.log("este es el array de objecto ", resultado);

      // let apiError = "";
      // // if (error)
      // //   apiError =
      // //     (error as { error: string }).error ||  (error as { issue: string}).issue ||"ups, something went wrong";
      // setErrorHook(apiError);

      // console.log('este error', errorHook);
    }
  };

  return (
    <>
      <Header />
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
            Sing
            <span className="text-green">up</span>
          </h1>
          <p className="text-2xl text-right text-green">
            All
            <span className="text-black"> starts here</span>
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8 items-center "
          >
            <div>
              <label htmlFor="" className="flex items-center gap-2 input">
                <input
                  type="text"
                  placeholder="Name"
                  className="bg-transparent w-[250px] focus:outline-none text-secondaryText"
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
              <label htmlFor="" className=" flex items-center gap-0 input">
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
