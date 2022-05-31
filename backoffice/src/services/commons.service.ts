import { CommonsUriEnum } from "src/models/commons";
import { requestAxios } from "./requestApi";

export async function addItem(uri: CommonsUriEnum, data: object) {
    const response = await requestAxios('POST', `/commons/${uri}`, data);
    return response;
}

export async function updateItem(uri: CommonsUriEnum, id: string, data: object) {
    const response = await requestAxios('PUT', `/commons/${uri}/${id}`, data);
    return response;
}

export async function deleteItem(uri: CommonsUriEnum, id: string) {
    const response = await requestAxios('DELETE', `/commons/${uri}/${id}`);
    return response;
}

export async function getItems(uri: CommonsUriEnum) {
    const response = await requestAxios('GET', `/commons/${uri}`);
    return response;
}
