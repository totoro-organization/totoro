import { getItems } from "src/api/requests";
import { API_ROUTES } from "src/api/routes";

export async function getJobs(query?: any) {
    const response = await getItems(API_ROUTES.JOBS, query);
    return response;
}