import { requestAxios } from "../requestAxios";
import { API_ROUTES } from "../routes";

export async function getJob(id: string) {
    const response = await requestAxios('GET', `${API_ROUTES.JOBS}/${id}`);
    return response;
}