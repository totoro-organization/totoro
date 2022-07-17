import { ForgotPasswordData, ResetPasswordData, Response, Token } from "src/models/services";
import { requestAxios } from "./requestApi";
import { API_ROUTES } from "./routes";

export const User_BASE_URL = "/users"

export async function getUsers() {
    const response = await requestAxios("GET", API_ROUTES.USERS );
    return response;
} 

export async function updateUser(id: string, data: object) {
    const response = await requestAxios("PUT", `${API_ROUTES.USERS}/${id}`, data);
    return response;
} 

export async function updatePasswordUser(data: object) {
    const response = await requestAxios("PUT", `${API_ROUTES.USERS}/change/password`, data);
    return response;
} 

export async function resetPasswordUser(data: ResetPasswordData) {
    const response = await requestAxios("PUT", `${API_ROUTES.USERS}/reset/password`, data);
    return response;
} 

export async function updateAvatarUser(data: object) {
    const response = await requestAxios("PUT", `${API_ROUTES.USERS}/change/avatar`, data);
    return response;
} 

export async function validateAccountUser(token: Token): Promise<Response> {
    const response: Response = await requestAxios("PUT", `${API_ROUTES.USERS}/account/activate`, { token } );
    return response;
}
