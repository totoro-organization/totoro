import config from "../../config";
import { API_HOST, API_ROUTES } from "../../routes";

interface LoginUser {
  emailOrUsername: string;
  password: string;
}

export default async function fetchLoginUser({
  emailOrUsername,
  password,
}: LoginUser) {
  const body: LoginUser = {
    emailOrUsername,
    password,
  };

  return fetch(`${API_HOST}${API_ROUTES.AUTH_REGISTER}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      app_id: config.APP_ID,
    },
    body: JSON.stringify(body),
  });
}
