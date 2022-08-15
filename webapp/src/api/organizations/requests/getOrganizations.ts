import { getItems } from "src/api/requests";
import { API_ROUTES } from "src/api/routes";

export async function getOrganizations(query?: any) {
    const response = await getItems(API_ROUTES.ORGANIZATIONS, query);
    return response;
}