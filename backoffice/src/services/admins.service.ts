import { requestAxios } from "./requestApi";

export const ADMIN_BASE_URL = "/admins"

export async function getAdmins() {
    const response = await requestAxios("GET", ADMIN_BASE_URL );
    return response;
} 

export async function updateRoleAdmin(id: string, data: object) {
    const response = await requestAxios("PUT", `${ADMIN_BASE_URL}/${id}/role`, data);
    return response;
} 