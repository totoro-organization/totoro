import { Response } from "src/models";
import { requestAxios } from "./requestApi";
import { API_ROUTES } from "./routes";

export async function sendLog(id: string, data: object): Promise<Response> {
    const response = await requestAxios("POST", `${API_ROUTES.ADMINS}/${id}/logs`, data );
    return response;
} 

export async function getAdmins() {
    const response = await requestAxios("GET", API_ROUTES.ADMINS );
    return response;
} 

export async function updateRoleAdmin(id: string, data: object): Promise<Response> {
    const response = await requestAxios("PUT", `${API_ROUTES.ADMINS}/${id}/role`, data);
    return response;
} 

export async function updateAdmin(id: string, data: object): Promise<Response> {
    const response = await requestAxios("PUT", `${API_ROUTES.ADMINS}/${id}`, data);
    return response;
} 

export async function updatePasswordAdmin(data: object): Promise<Response> {
    const response = await requestAxios("PUT", `${API_ROUTES.ADMINS}/change/password`, data);
    return response;
} 