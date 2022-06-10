import { requestAxios } from "./requestApi";

export const STATUS_BASE_URL = "/status"

export async function getStatuses() {
    const response = await requestAxios("GET", STATUS_BASE_URL);
    return response;
} 

export async function changeStatus(data: object) {
    const response = await requestAxios("PUT", `/change${STATUS_BASE_URL}`, data);
    return response;
}