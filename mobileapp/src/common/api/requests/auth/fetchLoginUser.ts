import config from "../../config";
import { API_HOST, API_ROUTES } from "../../routes";
import { LoginUser } from "./interfaces";

interface Token {
  token: string;
}

export default async function fetchLoginUser({
  emailOrUsername,
  password,
}: LoginUser): Promise<Token | any> {
  const body: LoginUser = {
    emailOrUsername,
    password,
  };

  return fetch(`${API_HOST}${API_ROUTES.AUTH_LOGIN}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      app_id: config.APP_ID,
    },
    body: JSON.stringify(body),
  });
}
