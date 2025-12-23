import { useEffect, useContext } from "react";
import contextComponent from "../context/AuthContext";
import { getTask } from "../services/tasks.service";

import { useNavigate } from "react-router-dom";
import { TaskList } from "./TaskList";
import { Header } from "../components/layout/Header";
export const DashBoard = () => {
  const { openModal, taskDelete, setTaskList, taskList } =
    useContext(contextComponent);
  // const [loading, setLoading] = useState<boolean>(false);
  const navegate = useNavigate();

  const createTaskNavegate = () => {
    navegate("/task/create");
  };
  
  useEffect(() => {
    // setLoading(true);
    async function fecthData() {
      try {
        const taskResult = await getTask();
        setTaskList(taskResult?.data);
      } catch (error) {
        console.log(error);
      } finally {
        // setLoading(false);
      }
    }

    fecthData();
  }, [openModal, taskDelete, setTaskList]);

  return (
    <>
    <Header />

      {/* Main Content */}
      <div className="flex flex-col w-[80%] h-full my-[5rem]  m-auto">
        <div className="ml-auto my-5 w-full">
          <button
            className="bg-bgApp p-3 rounded-3xl
            hover:text-green cursor-pointer transition-all 
            duration-300 ease-in-out font-bold  "
            onClick={() => {
              createTaskNavegate();
            }}
          >
            Create Task
          </button>
          {/* <div className="">{loading && <Spinner />}</div> */}
        </div>

        {taskList.length ? (
          <>
            <TaskList />
          </>
        ) : (
          <h2
            className="text-mainText text-2xl
           font-medium text-center"
          >
            No tasks yet
          </h2>
        )}
      </div>
    </>
  );
};
