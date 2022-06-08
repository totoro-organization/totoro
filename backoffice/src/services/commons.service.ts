import { CommonsUriEnum } from "src/models/commons";
import { requestAxios } from "./requestApi";

export async function addItem(uri: CommonsUriEnum | string, data: object) {
    const response = await requestAxios('POST', `${uri}`, data);
    return response;
}

export async function updateItem(uri: CommonsUriEnum | string, id: string, data: object) {
    const response = await requestAxios('PUT', `${uri}/${id}`, data);
    return response;
}

export async function deleteItem(uri: CommonsUriEnum | string, id: string) {
    const response = await requestAxios('DELETE', `${uri}/${id}`);
    return response;
}

export async function getItems(uri: CommonsUriEnum | string) {
    const response = await requestAxios('GET', uri);
    return response;
}
