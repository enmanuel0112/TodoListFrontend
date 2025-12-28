import { apiFect } from "./api";
type Task = {
  taskId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  isCompleted: boolean;
  user: userTask;
};
interface taskDelete {
  message: string;
}
interface userTask {
  id: number;
  userName: string;
  email: string;
}
type CheckTask = {
  isCompleted: boolean;
};
interface Pagination {
  data: [];
  pages: number;
  total: number;
  totalPages: number;
}

export async function createTask(content: string) {
  const create = await apiFect("task", {
    method: "POST",
    body: JSON.stringify({ content }),
  });

  return create;
}

export async function getTask(currentPage: number) {
  const task = await apiFect(`task/?page=${currentPage}&limit=3`, { method: "GET" });
  return task as Pagination;
}

export async function checkTask(taskId: number, isCompleted: boolean) {
  const task = await apiFect(`task/${taskId}`, {
    method: "PUT",
    body: JSON.stringify({ isCompleted }),
  });

  return task as CheckTask;
}

export async function updateTask(taskId: number, content: string) {
  const task = await apiFect(`task/${taskId}`, {
    method: "PUT",
    body: JSON.stringify({ content }),
  });

  return task as Task;
}

export async function deleteTask(taskId: number) {
  const task = await apiFect(`task/${taskId}`, {
    method: "DELETE",
  });

  return task as taskDelete;
}
