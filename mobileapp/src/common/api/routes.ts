// FIXME
export const API_HOST = `http://127.0.0.1:6868/api`;

export const API_ROUTES = {
  AUTH_LOGIN: "/auth/login", // POST
  AUTH_REGISTER: "/auth/signup", // POST
  AUTH_USER_CONNECTED: "/auth/connected", // GET

  USER_FAVORITES: (userId: string) => `/users/${userId}/favorites`, // GET, POST
  USER_JOBS: (userId: string) => `/users/${userId}/jobs`, // GET

  FAVORITES: (favoriteId: string) => `/favorites/${favoriteId}`, // DELETE
  JOBS: "/jobs", // GET
  JOB: (jobId: string) => `/jobs/${jobId}`, // GET
} as const;
