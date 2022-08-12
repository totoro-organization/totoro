import { requestAxios } from "../requestAxios";
import { API_ROUTES } from "src/api/routes";

export async function getUser(id: string) {
    const response = await requestAxios('GET', `${API_ROUTES.USERS}/${id}`);
    return response;
}