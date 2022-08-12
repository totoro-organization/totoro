import { requestAxios } from "../requestAxios";
import { API_ROUTES } from "src/api/routes";

export async function updateUser(id: string, data: object) {
    const response = await requestAxios("PUT", `${API_ROUTES.USERS}/${id}`, data);
    return response;
} 