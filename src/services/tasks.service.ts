import { apiFect } from "./api";
type Task = {
  taskId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  isCompleted: boolean;
  user?: number;
};
interface taskDelete {
  message: string;
}
type CheckTask = {
  isCompleted: boolean;
};

export async function createTask(content: string) {
  const create = await apiFect("task", {
    method: "POST",
    body: JSON.stringify({ content }),
  });

  return create ;
}

export async function getTask() {
  const task = await apiFect("task/me", { method: "GET" });

  return task as Task[];
}

export async function checkTask(taskId: number, isCompleted: boolean) {
  const task = await apiFect(`task/update/${taskId}`, {
    method: "PUT",
    body: JSON.stringify({ isCompleted }),
  });

  return task as CheckTask;
}

export async function updateTask(
  taskId: number,
  content: string,
) {
  const task = await apiFect(`task/update/${taskId}`, {
    method: "PUT",
    body: JSON.stringify({ content }),
  });

  return task as Task;
}


export async function deleteTask(
  taskId: number,
) {
  const task = await apiFect(`task/delete/${taskId}`, {
    method: "DELETE",

  });

  return task as taskDelete ;
}
