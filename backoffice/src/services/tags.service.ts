import { requestAxios } from "./requestApi";

export async function addTag(data: { label: string }) {
    const response = await requestAxios('POST', `/commons/tags`, data);
    return response;
}

export async function updateTag(tagId: string, data: { label: string }) {
    const response = await requestAxios('PUT', `/commons/tags/${tagId}`, data);
    return response;
}

export async function getTags() {
    const response = await requestAxios('GET', '/commons/tags');
    return response;
}
