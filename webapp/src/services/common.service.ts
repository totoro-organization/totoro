import { requestAxios } from "./requestApi";

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