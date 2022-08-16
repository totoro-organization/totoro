import { requestAxios } from "src/api/requestAxios";
import { API_ROUTES } from "src/api/routes";

export async function addOrganization(data: object) {
    const response = await requestAxios('POST', API_ROUTES.ORGANIZATIONS, data);
    return response;
}