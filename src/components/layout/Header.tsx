import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <div className="flex justify-between items-center p-4 border-b-2 border-gray-300">
        <NavLink to="/" className="text-5xl font-semibold">
          Todo<span className="text-[#6B936D] font-medium ">List</span>
        </NavLink>
       
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
      </div>
    </header>
  );
};
