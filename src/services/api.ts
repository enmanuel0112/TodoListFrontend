const Base_URL = "http://localhost:4000/api";
// import {contextComponent} from '../context/AuthContext';

export async function apiFect(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ user?: object }> {
  const response = await fetch(`${Base_URL}/${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw {
      status: response.status,
      message: error.message || response.statusText,
      errors: error.error,
      issues: [error.issues],
    };
  }
  const data = await response.json();
  return data;
}
