const { REACT_APP_APP_ID: APP_ID, REACT_APP_API_BASE_URL: API_BASE_URL } = process.env;

const URI = '/api'

export const config = {
    app_id: APP_ID,
    server: API_BASE_URL,
    uri: URI,
    baseUrl: API_BASE_URL + URI
}