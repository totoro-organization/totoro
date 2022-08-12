import { ResetPasswordData } from "src/models/services";
import { requestAxios } from "../requestAxios";
import { API_ROUTES } from "../routes";

export async function resetPasswordUser(data: ResetPasswordData) {
    const response = await requestAxios("PUT", `${API_ROUTES.USERS}/reset/password`, data);
    return response;
} 