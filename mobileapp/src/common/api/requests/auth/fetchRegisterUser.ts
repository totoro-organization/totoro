import { API_HOST, API_ROUTES } from "../../routes";
import config from "../../config";
import { User } from "../../../../models/user";

export interface LoginUser {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  birthday: string;
  password: string;
}

type FetchSumbitRegisterUser = {
  user: LoginUser;
};

export default async function fetchRegisterUser({
  user,
}: FetchSumbitRegisterUser): Promise<any> {
  const body: LoginUser = user;

  return fetch(`${API_HOST}${API_ROUTES.AUTH_REGISTER}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      app_id: config.APP_ID,
    },
    body: JSON.stringify(body),
  });
}
