import config from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_HOST, API_ROUTES } from "../../routes";
import Toast from "react-native-toast-message";

export default async function fetchRegisterJob(
  job_id: string,
  jobName: string
): Promise<any> {
  const userToken = await AsyncStorage.getItem("userToken");
  const bearer = "Bearer" + " " + userToken;

  const myHeaders = new Headers({
    "Content-Type": "application/json",
    app_id: config.APP_ID,
    Authorization: bearer,
  });

  try {
    const response = await fetch(
      `${API_HOST}${API_ROUTES.JOB_REGISTER(job_id)}`,
      {
        method: "POST",
        headers: myHeaders,
      }
    );

    if (response.status === 201) {
      Toast.show({
        type: "success",
        props: {
          title: "Tout est bon",
          text: `Tu t'es bien inscrit à la mission ${jobName} !`,
        },
      });
    }
  } catch (err) {
    console.error(err);
  }
}
