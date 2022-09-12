import { requestAxios } from "src/api/requestAxios";
import { API_ROUTES } from "src/api/routes";

export async function updateOrganization(id: string, data: object) {
    const response = await requestAxios("PUT", `${API_ROUTES.ORGANIZATIONS}/${id}`, data);
    return response;
} 