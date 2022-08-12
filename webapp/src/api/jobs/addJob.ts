import { requestAxios } from "../requestAxios";
import { API_ROUTES } from "src/api/routes";

export async function addJob(data: object) {
    const response = await requestAxios('POST', API_ROUTES.JOBS, data);
    return response;
}