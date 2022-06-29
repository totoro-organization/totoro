export type ApiRoutesType = typeof API_ROUTES[keyof typeof API_ROUTES];

export const API_ROUTES = {
  JOBS: '/jobs',
  ORGANIZATIONS_JOBS: (currentAppId: string) =>
    `/organizations/${currentAppId}/jobs`
} as const;
