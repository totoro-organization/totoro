import { requestAxios } from "./requestAxios";

export async function getItems(uri: string, query?: any) {
    if(query) {
        uri += '?';
        for (const key in query) {
            uri += key + '=' + query[key] + '&';
        }
        uri = uri.slice(0, -1); // Remove last '&'
        
    }
    const response = await requestAxios('GET', uri);
    return response;
}

export async function addItem(uri: string, data: object) {
    const response = await requestAxios('POST', `${uri}`, data);
    return response;
}

export async function updateItem(uri: string, id: string, data: object) {
    const response = await requestAxios('PUT', `${uri}/${id}`, data);
    return response;
}

export async function deleteItem(uri: string, id: string) {
    const response = await requestAxios('DELETE', `${uri}/${id}`);
    return response;
}

