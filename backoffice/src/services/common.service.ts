import { Response } from "src/models";
import { requestAxios } from "./requestApi";
import type { Route } from "./routes";

export async function addItem(uri: Route, data: object): Promise<Response> {
    const response = await requestAxios('POST', `${uri}`, data);
    return response;
}

export async function updateItem(uri: Route, id: string, data: object): Promise<Response> {
    const response = await requestAxios('PUT', `${uri}/${id}`, data);
    return response;
}

export async function deleteItem(uri: Route, id: string): Promise<Response> {
    const response = await requestAxios('DELETE', `${uri}/${id}`);
    return response;
}

export async function getItems(uri: Route, query?: any) {
    if(query) {
        uri += '?';
        for (const key in query) {
            uri += key + '=' + query[key] + '&';
        }
        (uri as string) = uri.slice(0, -1); // Remove last '&'
    }
    const response = await requestAxios('GET', uri);
    return response;
}


