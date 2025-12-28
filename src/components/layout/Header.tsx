import { NavLink } from "react-router-dom";
import { FaGear } from "react-icons/fa6";
import { useContext } from "react";
import contextComponent from "../../context/AuthContext";
import { ProfileConfig } from "../ProfileConfig";
export const Header = () => {
  const { openSetting, setOpenSetting, user } = useContext(contextComponent);
  return (
    <header>
      <div className="flex flex-row justify-between sm:flex-row items-center sm:justify-between gap-4 px-4 sm:px-6 py-4 border-b-2 border-gray-300">
        <NavLink
          to="/"
          className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-center sm:text-left"
        >
          Todo<span className="text-[#6B936D] font-medium ">List</span>
        </NavLink>

        {user ? (
          <>
            <div className="flex items-center gap-3">
              <button onClick={() => setOpenSetting(!openSetting)}>
                <FaGear
                  className={
                    openSetting
                      ? "text-green cursor-pointer text-2xl sm:text-3xl"
                      : "text-mainText text-2xl sm:text-3xl cursor-pointer"
                  }
                />
              </button>
              <div></div>
            </div>
            <ProfileConfig />
          </>
        ) : (
          <nav className="w-auto sm:w-auto">
            <ul className="flex flex-row sm:flex-row items-center gap-3 sm:gap-6 text-lg sm:text-xl text-[#333333] font-semibold">
              <li>
                <NavLink to="/login">Sign In</NavLink>
              </li>
              <li>
                <NavLink to="/register">Sign Up</NavLink>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};
