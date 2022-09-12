import { requestAxios } from "src/api/requestAxios";
import { API_ROUTES } from "src/api/routes";

export async function inviteOrganizationMember(id: string, data: object) {
    const response = await requestAxios('POST', API_ROUTES.ORGANIZATION_INVITE(id), data);
    return response;
}