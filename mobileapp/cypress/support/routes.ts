// TODO: Set this base url with Cypress.env()
export const FRONTEND_BASE_URL = "http://localhost:19006/";
export const API_BASE_URL = "http://127.0.0.1:6868/api";

export const API_ROUTES = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  AUTH_USER_CONNECTED: `${API_BASE_URL}/auth/connected`,
} as const;
