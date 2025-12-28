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

  const getDisplayedPages = () => {
    if (!pagination) return [];
    const total = pagination.totalPages;
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages: (number | "...")[] = [1];
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(total - 1, currentPage + 1);

    if (start > 2) pages.push("...");

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < total - 1) pages.push("...");

    pages.push(total);
    return pages;
  };

  return (
    <>
      <Header />

      {/* Main Content */}
      <div className="flex flex-col w-full max-w-5xl h-full my-12 sm:my-16 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex w-full justify-end my-5">
          <button
            className="bg-bgApp px-4 py-3 rounded-3xl hover:text-green cursor-pointer transition-all duration-300 ease-in-out font-bold w-full sm:w-auto text-center"
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
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-8 sm:mt-10 w-full px-2 ">
          {getDisplayedPages().map((page, idx) =>
            page === "..." ? (
              <span
                key={`ellipsis-${idx}`}
                className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center text-mainText font-bold"
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`
                  w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12
                  flex items-center justify-center
                  rounded-full
                  font-bold
                  transition-all duration-300 ease-in-out
                   cursor-pointer
                   ${currentPage === page
                       ? "bg-green text-white scale-110"
                       : "bg-bgApp hover:bg-green hover:text-white"}`} >
                {page}
              </button>
            )
          )}
        </div>
      </div>
    </>
  );
};
