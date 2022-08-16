import { API_AUTH_ROUTES } from "./auth"
import { API_COMMONS_ROUTES } from "./commons"
import { API_JOB_ROUTES } from "./jobs"
import { API_ORGANIZATIONS_ROUTES } from "./organizations"
import { API_USERS_ROUTES } from "./users"

export const API_ROUTES = {
    ...API_AUTH_ROUTES,
    ...API_COMMONS_ROUTES,
    ...API_JOB_ROUTES,
    ...API_ORGANIZATIONS_ROUTES,
    ...API_USERS_ROUTES
} as const

export type Route = typeof API_ROUTES[keyof typeof API_ROUTES]