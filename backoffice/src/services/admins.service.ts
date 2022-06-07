import { requestAxios } from "./requestApi";

export const ADMIN_BASE_URL = "/admins"

export async function getAdmins() {
    const response = await requestAxios("GET", ADMIN_BASE_URL );
    return response;
}   