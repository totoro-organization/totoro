import config from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_HOST, API_ROUTES } from "../routes";
import Toast from "react-native-toast-message";

export default async function addUserFavorite(
  organizationId: string,
  organizationName: string
): Promise<any> {
  const userToken = await AsyncStorage.getItem("userToken");
  const bearer = "Bearer" + " " + userToken;

  const myHeaders = new Headers({
    "Content-Type": "application/json",
    app_id: config.APP_ID,
    Authorization: bearer,
  });

  const body = { assos_id: organizationId };

  try {
    const response = await fetch(
      `${API_HOST}${API_ROUTES.USER_FAVORITES(organizationId)}`,
      {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      }
    );

    if (response.status === 201) {
      Toast.show({
        type: "success",
        props: {
          title: "Tout est bon",
          text: `Merci d'avoir follow ${organizationName} !`,
        },
      });
    }
  } catch (err) {
    console.error(err);
  }
}
