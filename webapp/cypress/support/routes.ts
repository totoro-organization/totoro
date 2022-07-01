// TODO: Set this base url with Cypress.env()
const FRONTEND_BASE_URL = 'http://localhost:3000';
const API_BASE_URL = 'http://127.0.0.1:6868/api';

export const FRONTEND_ROUTES = {
  LOGIN: `${FRONTEND_BASE_URL}/login`
} as const;

export const API_ROUTES = {
  LOGIN: `${API_BASE_URL}/login`
} as const;
