import config from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_HOST, API_ROUTES } from "../routes";

export default async function deleteFavorite(favoriteId: string): Promise<any> {
  const userToken = await AsyncStorage.getItem("userToken");
  const bearer = "Bearer" + " " + userToken;

  const myHeaders = new Headers({
    "Content-Type": "application/json",
    app_id: config.APP_ID,
    Authorization: bearer,
  });

  const body = { favoriteId };

  return fetch(`${API_HOST}${API_ROUTES.FAVORITES(favoriteId)}`, {
    method: "DELETE",
    headers: myHeaders,
    body: JSON.stringify(body),
  });
}
