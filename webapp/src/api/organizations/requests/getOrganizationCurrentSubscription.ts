import { requestAxios } from "src/api/requestAxios";
import { API_ROUTES } from "src/api/routes";

export async function getOrganizationCurrentSubscription(id: string) {
    const response = await requestAxios('GET', API_ROUTES.ORGANIZATION_CURRENT_SUBSCRIPTION(id));
    return response;
}