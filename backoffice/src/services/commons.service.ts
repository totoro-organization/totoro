import { requestAxios } from "./requestApi";

export async function addItem(model: string, data: { label: string }) {
    const response = await requestAxios('POST', `/commons/${model}`, data);
    return response;
}

export async function updateItem(model: string, tagId: string, data: { label: string }) {
    const response = await requestAxios('PUT', `/commons/${model}/${tagId}`, data);
    return response;
}

export async function deleteItem(model: string, tagId: string) {
    const response = await requestAxios('DELETE', `/commons/${model}/${tagId}`);
    return response;
}

export async function getItems(model: string) {
    const response = await requestAxios('GET', `/commons/${model}`);
    return response;
}
