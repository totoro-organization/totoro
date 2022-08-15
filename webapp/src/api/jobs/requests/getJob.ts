import { requestAxios } from "src/api/requestAxios";
import { API_ROUTES } from "src/api/routes";

export async function getJob(id: string) {
    const response = await requestAxios('GET', API_ROUTES.JOB(id));
    return response;
}