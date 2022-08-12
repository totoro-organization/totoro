import { Token } from "src/models";
import { requestAxios } from "../requestAxios";
import { API_ROUTES } from "../routes";

export async function validateAccountUser(token: Token): Promise<Response> {
    const response: Response = await requestAxios("PUT", `${API_ROUTES.USERS}/account/activate`, { token } );
    return response;
}