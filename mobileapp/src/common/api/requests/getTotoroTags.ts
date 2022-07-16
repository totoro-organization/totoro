import config from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_HOST, API_ROUTES } from "../routes";

export default async function getTotoroTags(): Promise<any> {
  const myHeaders = new Headers({
    "Content-Type": "application/json",
    app_id: config.APP_ID,
  });

  const response = await fetch(`${API_HOST}${API_ROUTES.TOTORO_TAGS}`, {
    method: "GET",
    headers: myHeaders,
  });

  return response.json();
}
