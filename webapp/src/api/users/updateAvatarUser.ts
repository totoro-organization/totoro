import { requestAxios } from "../requestAxios";
import { API_ROUTES } from "src/api/routes";

export async function updateAvatarUser(data: object) {
    const response = await requestAxios("PUT", `${API_ROUTES.USERS}/change/avatar`, data);
    return response;
} 
