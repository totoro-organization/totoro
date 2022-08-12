import { requestAxios } from "../requestAxios";
import { API_ROUTES } from "src/api/routes";

export async function updatePasswordUser(data: object) {
    const response = await requestAxios("PUT", `${API_ROUTES.USERS}/change/password`, data);
    return response;
} 