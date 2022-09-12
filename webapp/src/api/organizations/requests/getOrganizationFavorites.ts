import { getItems } from "src/api/requests";
import { API_ROUTES } from "src/api/routes";

export async function getOrganizationFavorites(id: string, query?: any) {
    const response = await getItems(API_ROUTES.ORGANIZATION_FAVORITES(id), query);
    return response;
}