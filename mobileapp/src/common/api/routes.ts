export const API_HOST = `${process.env.REACT_APP_API_BASE_URL}/api`;

export const API_ROUTES = {
  AUTH_LOGIN: "/auth/login", // POST
  AUTH_REGISTER: "/auth/signup", // POST
  AUTH_USER_CONNECTED: "/auth/connected", // GET

  USER_FAVORITES: (userId: string) => `/users/${userId}/favorites`, // GET, POST
  USER_JOBS: (userId: string) => `/users/${userId}/jobs`, // GET

  FAVORITES: (favoriteId: string) => `/favorites/${favoriteId}`, // DELETE
  JOBS: () => "/jobs", // GET
} as const;
