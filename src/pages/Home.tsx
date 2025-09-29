import { Header } from "../components/layout/Header";
import gifHomePage from "../assets/for-blog-4 (1).gif";
import { Button } from "../components/Button";
// import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import contextComponent from "../context/AuthContext";

export const Home = () => {
  return (
    <>
      <div>
        <Header />
        <CardTask />
      </div>
    </>
  );
};

const CardTask = () => {
  const navegate = useNavigate();
  const auth = useContext(contextComponent);

  async function handleClick() {
    const authUser = auth?.user;

    if (authUser?.userName !== undefined) {
      navegate("/task/create");
    } else {
      navegate("/login");
    }
  }
  return (
    <>
      <div
        className="flex gap-20 flex-col justify-center items-center
       mx-auto   w-[80%] h-[90vh]  "
      >
        <img
          src={gifHomePage}
          alt="home page gif"
          className="w-auto h-[500px] items-center 
          rounded-[12px] drop-shadow-2xl"
        />

        <Button
          name="Add Task"
          onclick={() => {
            handleClick();
          }}
        />
      </div>
    </>
  );
};
