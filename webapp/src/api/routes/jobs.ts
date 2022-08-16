export const API_JOB_ROUTES = {
    JOBS: '/jobs',
    JOB: (id: string) => `/jobs/${id}`,
    JOB_PARTICIPANTS: (id: string) => `/jobs/${id}/participants`,
}