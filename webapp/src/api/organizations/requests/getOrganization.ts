import { requestAxios } from "src/api/requestAxios";
import { API_ROUTES } from "src/api/routes";

export async function getOrganization(id: string) {
    const response = await requestAxios('GET', `${API_ROUTES.ORGANIZATIONS}/${id}`);
    return response;
}