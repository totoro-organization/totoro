import { API_HOST, API_ROUTES } from "../../routes";
import config from "../../config";
import { User } from "../../../../models/user";

type FetchSumbitRegisterUser = {
  user: User;
};

export default async function fetchRegisterUser({
  user,
}: FetchSumbitRegisterUser): Promise<any> {
  const body: FetchSumbitRegisterUser = {
    user,
  };

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
