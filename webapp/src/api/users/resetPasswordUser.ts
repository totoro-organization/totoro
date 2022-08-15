import { ResetPasswordData } from "src/models/services";
import { requestAxios } from "src/api/requestAxios";
import { API_ROUTES } from "src/api/routes";

export async function resetPasswordUser(data: ResetPasswordData) {
    const response = await requestAxios("PUT", `${API_ROUTES.USERS}/reset/password`, data);
    return response;
} 