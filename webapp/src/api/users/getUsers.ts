import { getItems } from "../requests";
import { API_ROUTES } from "src/api/routes";

export async function getUsers(query?: any) {
    const response = await getItems(API_ROUTES.USERS, query);
    return response;
}