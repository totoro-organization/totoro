import { Token } from "src/models";
import { requestAxios } from "src/api/requestAxios";
import { API_ROUTES } from "src/api/routes";

export async function validateAccountUser(token: Token): Promise<Response> {
    const response: Response = await requestAxios("PUT", `${API_ROUTES.USERS}/account/activate`, { token } );
    return response;
}