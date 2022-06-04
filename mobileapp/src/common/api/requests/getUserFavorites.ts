import config from "../config";
import { API_HOST, API_ROUTES } from "../routes";

export default async function getUserFavorites(userId: string): Promise<any> {
  const myHeaders = new Headers({
    "Content-Type": "application/json",
    app_id: config.APP_ID,
  });

  const response = await fetch(
    `${API_HOST}${API_ROUTES.USER_FAVORITES(userId)}`,
    {
      method: "GET",
      headers: myHeaders,
    }
  );

  return response;
}
