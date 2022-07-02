import { requestAxios } from "./requestApi";
import type { Route } from "./routes";

export async function addItem(uri: Route, data: object) {
    const response = await requestAxios('POST', `${uri}`, data);
    return response;
}

export async function updateItem(uri: Route, id: string, data: object) {
    const response = await requestAxios('PUT', `${uri}/${id}`, data);
    return response;
}

export async function deleteItem(uri: Route, id: string) {
    const response = await requestAxios('DELETE', `${uri}/${id}`);
    return response;
}

export async function getItems(uri: Route) {
    const response = await requestAxios('GET', uri);
    return response;
}
