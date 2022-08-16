import { requestAxios } from "src/api/requestAxios";
import { API_ROUTES } from "src/api/routes";

export async function updateOrganizationLogo(id: string, data: object) {
    const response = await requestAxios("PUT", API_ROUTES.ORGANIZATION_UPDATE_LOGO(id), data);
    return response;
} 