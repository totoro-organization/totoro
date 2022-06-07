import { CommonsUriEnum } from "src/models/commons";
import { requestAxios } from "./requestApi";

export const COMMONS_BASE_URL = "/commons"

export async function addItem(uri: CommonsUriEnum, data: object) {
    const response = await requestAxios('POST', `${COMMONS_BASE_URL}/${uri}`, data);
    return response;
}

export async function updateItem(uri: CommonsUriEnum, id: string, data: object) {
    const response = await requestAxios('PUT', `${COMMONS_BASE_URL}/${uri}/${id}`, data);
    return response;
}

export async function deleteItem(uri: CommonsUriEnum, id: string) {
    const response = await requestAxios('DELETE', `${COMMONS_BASE_URL}/${uri}/${id}`);
    return response;
}

export async function getItems(uri: CommonsUriEnum) {
    const response = await requestAxios('GET', `${COMMONS_BASE_URL}/${uri}`);
    return response;
}
