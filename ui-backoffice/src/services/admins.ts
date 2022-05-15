import { requestAxios } from "./requestApi";


export async function getAdmins() {
    const response = await requestAxios("GET", "/admins" );
    return response;
}   