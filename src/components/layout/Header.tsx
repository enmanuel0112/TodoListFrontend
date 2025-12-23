import { NavLink } from "react-router-dom";
import { FaGear } from "react-icons/fa6";
import { useContext } from "react";
import contextComponent from "../../context/AuthContext";
import { ProfileConfig } from "../ProfileConfig";
export const Header = () => {
  const { openSetting, setOpenSetting, user } = useContext(contextComponent);
  return (
    <header>
      <div className="flex justify-between items-center p-4 border-b-2 border-gray-300">
        <NavLink to="/" className="text-5xl font-semibold">
          Todo<span className="text-[#6B936D] font-medium ">List</span>
        </NavLink>

        {user ? (
          <>
            <div>
              <button onClick={() => setOpenSetting(!openSetting)}>
                <FaGear
                  className={
                    openSetting
                      ? "text-green cursor-pointer text-3xl"
                      : "text-mainText text-3xl cursor-pointer"
                  }
                />
              </button>
              <div></div>
            </div>
            <ProfileConfig />
          </>
        ) : (
          <nav>
            <ul className="flex space-x-4 text-xl text-[#333333] font-semibold">
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
