import { CommonsEnum } from "src/models/commons";
import { requestAxios } from "./requestApi";

export async function addItem(model: CommonsEnum, data: { label: string }) {
    const response = await requestAxios('POST', `/commons/${model}`, data);
    return response;
}

export async function updateItem(model: CommonsEnum, tagId: string, data: { label: string }) {
    const response = await requestAxios('PUT', `/commons/${model}/${tagId}`, data);
    return response;
}

export async function deleteItem(model: CommonsEnum, tagId: string) {
    const response = await requestAxios('DELETE', `/commons/${model}/${tagId}`);
    return response;
}

export async function getItems(model: CommonsEnum) {
    const response = await requestAxios('GET', `/commons/${model}`);
    return response;
}
