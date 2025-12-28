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
      <div className="flex flex-col items-center justify-center gap-10 sm:gap-14 w-full max-w-5xl mx-auto min-h-[70vh] px-4 sm:px-6 lg:px-8 py-12">
        <img
          src={gifHomePage}
          alt="home page gif"
          className="w-full max-w-4xl h-[400px] max-h-[320px] sm:max-h-[420px] lg:max-h-[520px] object-contain rounded-[12px] drop-shadow-2xl"
        />

        <div className="w-full sm:w-auto">
          <Button
            name="Add Task"
            onclick={() => {
              handleClick();
            }}
          />
        </div>
      </div>
    </>
  );
};
