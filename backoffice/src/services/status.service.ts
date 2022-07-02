import { requestAxios } from "./requestApi";
import { API_ROUTES } from "./routes";

export async function getStatuses() {
    const response = await requestAxios("GET", API_ROUTES.STATUS);
    return response;
} 

export async function changeStatus(data: object) {
    const response = await requestAxios("PUT", `/change${API_ROUTES.STATUS}`, data);
    return response;
}