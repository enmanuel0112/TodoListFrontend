import { useContext } from "react";
import contextComponent from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { editProfile } from "../services/users.service";
import { useNavigate } from "react-router-dom";

interface ProfileEditForm {
  username: string;
  email: string;
}

export const ProfileConfig = () => {
  const { openSetting, setOpenProfileConfig, logout } =
    useContext(contextComponent);
  const navigate = useNavigate();

  return (
    openSetting && (
      <>
        <div
          className="flex flex-col gap-4 p-4 border-b-2
      border-gray-300 absolute top-16 right-4
       bg-bgApp shadow-lg rounded-[10px] z-10"
        >
          <button
            className="cursor-pointer hover:text-green"
            onClick={() => setOpenProfileConfig?.((prev) => !prev)}
          >
            Edit
          </button>
          <button
            className="cursor-pointer hover:text-green"
            onClick={async () => {
              await logout?.();
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>

        <ProfileEdit />
      </>
    )
  );
};

export const ProfileEdit = () => {
  const { register, handleSubmit } = useForm<ProfileEditForm>();
  const { openProfileConfig, setOpenProfileConfig, setUpdateUserName } =
    useContext(contextComponent);
  const onSubmit = async (data: ProfileEditForm) => {
    try {
      await editProfile(data.username, data.email);
      setUpdateUserName?.(data.username);
      setOpenProfileConfig?.(false);
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error updating profile:", error.message);
      }
    }
  };

  if (!openProfileConfig) return null;

  return (
    <div
      className="fixed inset-0 w-full h-full bg-green/50
      flex items-center justify-center px-4 z-20"
    >
      <div className="bg-bgApp p-8 rounded-[16px] shadow-lg flex flex-col gap-6 w-full max-w-[820px] relative">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-mainText text-2xl font-medium">Edit Profile</h2>
          <button
            className="text-red-500 text-2xl cursor-pointer"
            onClick={() => setOpenProfileConfig?.(false)}
          >
            X
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-secondaryText font-medium">Username</span>
            <input
              type="text"
              className="bg-white text-mainText focus:outline-none p-4 rounded-[12px] shadow-md"
              {...register("username")}
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-secondaryText font-medium">Email</span>
            <input
              type="email"
              className="bg-white text-mainText focus:outline-none p-4 rounded-[12px] shadow-md"
              {...register("email")}
            />
          </label>

          <div className="flex justify-center mt-2">
            <button type="submit" className="btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
