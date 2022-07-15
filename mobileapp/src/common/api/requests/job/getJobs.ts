import config from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_HOST, API_ROUTES } from "../../routes";

<<<<<<< HEAD
export interface JobsRequestParameters {
  longitude?: number;
  latitude?: number;
}

export default async function getJobs({
  longitude,
  latitude,
}: JobsRequestParameters): Promise<any> {
=======
export default async function getJobs(): Promise<any> {
>>>>>>> webapp
  const userToken = await AsyncStorage.getItem("userToken");
  const bearer = "Bearer" + " " + userToken;

  const myHeaders = new Headers({
    "Content-Type": "application/json",
    app_id: config.APP_ID,
    Authorization: bearer,
  });

<<<<<<< HEAD
  const response = await fetch(
    `${API_HOST}${API_ROUTES.JOBS}?longitude=${longitude}&latitude=${latitude}`,
    {
      method: "GET",
      headers: myHeaders,
    }
  );
=======
  const response = await fetch(`${API_HOST}${API_ROUTES.JOBS}`, {
    method: "GET",
    headers: myHeaders,
  });
>>>>>>> webapp

  return response.json();
}
