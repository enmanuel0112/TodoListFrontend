
import { apiFect } from "./api";
interface getMe {
    createdAt?: string;
  email?: string;
  id?: number;
  updatedAt?: string;
  userName?: string;
  user?: object;
}

export async function  getMe() {
    const getUser = await apiFect('me', { method: 'GET'});
    return getUser as getMe;
}