import { getItems } from "src/api/requests";
import { API_ROUTES } from "src/api/routes";

export async function getDifficulties(query?: any) {
    const response = await getItems(API_ROUTES.DIFFICULTIES, query);
    return response;
}