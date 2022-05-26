// TODO: use .env
export const API_HOST = "http://127.0.0.1:6868/api";

export const API_ROUTES = {
  AUTH_LOGIN: "/auth/login", // POST
  AUTH_REGISTER: "/auth/signup", // POST
  AUTH_USER_CONNECTED: "/auth/connected", // GET
} as const;
