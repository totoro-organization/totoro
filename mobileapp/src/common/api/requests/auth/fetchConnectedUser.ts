import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../../config";
import { API_HOST, API_ROUTES } from "../../routes";

export default async function fetchConnectedUser(): Promise<any> {
  const userToken = await AsyncStorage.getItem("userToken");
  const bearer = "Bearer " + userToken;

  const myHeaders = new Headers({
    "Content-Type": "application/json",
    app_id: config.APP_ID,
    Authorization: bearer,
  });

  return await fetch(`${API_HOST}${API_ROUTES.AUTH_USER_CONNECTED}`, {
    method: "GET",
    headers: myHeaders,
  });
}
