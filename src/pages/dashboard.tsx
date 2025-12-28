import { useEffect, useContext, useState } from "react";
import contextComponent from "../context/AuthContext";
import { getTask } from "../services/tasks.service";

import { useNavigate } from "react-router-dom";
import { TaskList } from "./TaskList";
import { Header } from "../components/layout/Header";

interface Pagination {
  data: [];
  pages: number;
  total: number;
  totalPages: number;
}
export const DashBoard = () => {
  const { openModal, taskDelete, setTaskList, taskList } =
    useContext(contextComponent);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const navegate = useNavigate();

  const createTaskNavegate = () => {
    navegate("/task/create");
  };

  useEffect(() => {
    async function fecthData() {
      try {
        const taskResult = await getTask(currentPage);
        setTaskList(taskResult?.data);
        setPagination(taskResult);
      } catch (error) {
        console.log(error);
      }
    }

    fecthData();
  }, [openModal, taskDelete, setTaskList, currentPage]);
  console.log("pagination", pagination);
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
        <div className="flex gap-4 m-auto mt-10">
          {pagination &&
            Array.from({ length: pagination.totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`
                  w-12 h-12
                  flex items-center justify-center
                  rounded-full
                  font-bold
                  transition-all duration-300 ease-in-out
                   cursor-pointer
                   ${currentPage === index + 1
                       ? "bg-green text-white scale-110"
                       : "bg-bgApp hover:bg-green hover:text-white"}`} >
                {index + 1}
              </button>
            ))}
        </div>
      </div>
    </>
  );
};
