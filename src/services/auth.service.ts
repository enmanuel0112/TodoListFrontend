import { apiFect } from "./api";

type User = {
  id: number;
  userName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  message: string;
};
type SignInResponse = {
  logged: boolean;
  user: User;
  userInfo: object;
  message: string;
  jwt: string;
};

export async function signIn(
  email: string,
  password: string
): Promise<SignInResponse> {
  const response = await apiFect("user/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  const data = response as SignInResponse;

  return data;
}

export async function signUp(
  userName: string,
  email: string,
  password: string
) {
  return apiFect("user/register", {
    method: "POST",
    body: JSON.stringify({ userName, email, password }),
  });
}


export async function signOut() {
  return apiFect("user/logout", {
    method: "POST",
  });
}