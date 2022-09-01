import { getItems } from "src/api/requests";
import { API_ROUTES } from "src/api/routes";

export async function getJobs() {
    const response = await getItems(API_ROUTES.JOBS);
    return response;
}