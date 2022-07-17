import { ResetPasswordData } from "src/models/services";
import { requestAxios } from "./requestApi";

export const User_BASE_URL = "/users"

export async function getUsers() {
    const response = await requestAxios("GET", User_BASE_URL );
    return response;
} 

export async function updateUser(id: string, data: object) {
    const response = await requestAxios("PUT", `${User_BASE_URL}/${id}`, data);
    return response;
} 

export async function updatePasswordUser(data: object) {
    const response = await requestAxios("PUT", `${User_BASE_URL}/change/password`, data);
    return response;
} 

export async function resetPasswordUser(data: ResetPasswordData) {
    const response = await requestAxios("PUT", `${User_BASE_URL}/reset/password`, data);
    return response;
} 

export async function updateAvatarUser(data: object) {
    const response = await requestAxios("PUT", `${User_BASE_URL}/change/avatar`, data);
    return response;
} 