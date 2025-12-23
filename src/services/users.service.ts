import { apiFect } from "./api";
interface getMe {
  createdAt?: string;
  email?: string;
  id?: number;
  updatedAt?: string;
  userName?: string;
  user?: object;
}

export async function getMe() {
  try {
    const getUser = await apiFect("user/profile", { method: "GET" });
    return getUser as getMe;
  } catch (error) {
    console.error("Get Me Error:", error);
    throw error;
  }
}

export async function editProfile(userName: string, email: string) {
  try {
    const editUser = await apiFect("user", {
      method: "PUT",
      body: JSON.stringify({ userName, email }),
    });
    return editUser;
  } catch (error) {
    console.error("Edit Profile Error:", error);
    throw error;
  }
}
