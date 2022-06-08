import { requestAxios } from "./requestApi";

export const STATUS_BASE_URL = "/status"

export async function getStatuses() {
    const response = await requestAxios("GET", STATUS_BASE_URL);
    return response;
} 