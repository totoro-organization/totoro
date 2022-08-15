import { getItems } from "src/api/requests";
import { API_ROUTES } from "src/api/routes";

export async function getJobParticipants(id: string, query?: any) {
    const response = await getItems(API_ROUTES.JOB_PARTICIPANTS(id), query);
    return response;
}