import { getItems } from "src/api/requests";
import { API_ROUTES } from "src/api/routes";

export async function getTags(query?: any) {
    const response = await getItems(API_ROUTES.TAGS, query);
    return response;
}